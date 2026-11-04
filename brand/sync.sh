#!/usr/bin/env bash
# Brings the fork up to date with wowsims/forever, rebuilds the site and deploys it. brand/README.md has the
# routine this script runs and what to do when a step stops it.
#
#   brand/sync.sh              merge upstream, build, check, deploy, push
#   brand/sync.sh --no-deploy  the same without the deploy and the push
#
# On Windows (Git Bash) set MAKE_SHELL="C:/Program Files/Git/usr/bin/sh.exe" and run it from a path with no
# space in it (the G: alias), as the project note says.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

deploy=1
for arg in "$@"; do
	case "$arg" in
	--no-deploy) deploy=0 ;;
	*)
		echo "unknown option: $arg" >&2
		exit 2
		;;
	esac
done

if [ "$(git config user.email)" != "329816702+standards-gg@users.noreply.github.com" ]; then
	echo "git user.email is not the standards-gg account; set it in this checkout first." >&2
	exit 1
fi

git remote get-url upstream >/dev/null 2>&1 || git remote add upstream https://github.com/wowsims/forever.git
git fetch upstream master
# A conflict stops here: resolve it, commit the merge, run the script again.
git merge --no-edit upstream/master

npm ci --ignore-scripts
make ${MAKE_SHELL:+SHELL="$MAKE_SHELL"} dist/forever/.dirstamp

# The layer's own gates: its components, and no page head left pointing at wowsims.com.
npx vitest run ui/app/brand ui/app/landing
if grep -rl 'www\.wowsims\.com' dist/forever --include='index.html' | grep .; then
	echo "pages above still carry wowsims.com links; tools/vite/brand_html.mts missed a tag." >&2
	exit 1
fi

cp brand/vercel.json dist/vercel.json
if [ "$deploy" = 1 ]; then
	# dist/.vercel holds the project link; the first run creates it (vercel asks which project).
	(cd dist && vercel deploy --prod --yes)
	git push origin master
fi
