// The Standards.gg layer over the WoWSims Forever site: every name, link and image the fork changes, in one
// place. The site build writes the page heads from it (tools/vite/brand_html.mts), the landing page draws its
// header mark and footer from it (ui/app/brand/), and brand/README.md lists every file the layer reaches.
export const BRAND = {
	name: 'Standards.gg',
	product: 'Forever Sim',
	tagline: 'Forever Sim · built on WoWSims',
	url: 'https://standards.gg/',
	// The origin the site is served from. Canonical and social-preview links are absolute, so a move to
	// another host changes this and nothing else.
	origin: 'https://sim.standards.gg',
	discordUrl: 'https://discord.gg/standards-gg',
	repoUrl: 'https://github.com/standards-gg/foreversim',
	logo: '/forever/assets/img/brand/standards-mark.svg',
	favicon: '/forever/assets/img/brand/favicon.ico',
	appleTouchIcon: '/forever/assets/img/brand/standards-mark-180.png',
	socialImage: { path: '/forever/assets/img/brand/standards-mark-512.png', width: 512, height: 512, alt: 'Standards.gg logo' },
	copyrightStartYear: 2026,
} as const;

// The project the site is built on. Its MIT licence keeps the copyright notice with the code, and the footer
// links the project and its source on every landing page.
export const UPSTREAM = {
	name: 'WoWSims',
	url: 'https://www.wowsims.com/',
	repoUrl: 'https://github.com/wowsims/forever',
} as const;

// The English strings that name the site, laid over the locale in ui/i18n/config.ts: the landing page's title
// and description (its page head and its runtime title), the label over the spec name in a spec page's header,
// and the tour's welcome. The spec pages' own titles name no site.
export const BRAND_STRINGS = {
	landing: {
		home: {
			title: `${BRAND.name} ${BRAND.product} - World of Warcraft Forever DPS & Gear Simulators`,
			description:
				'Free World of Warcraft® Forever DPS and gear simulators by Standards.gg, built on the open-source WoWSims engine. Sim your DPS, compare gear and optimize your character.',
		},
	},
	sidebar: { header: { title: `${BRAND.name} - ${BRAND.product}` } },
	onboarding: { steps: { welcome: { title: `Welcome to ${BRAND.product}` } } },
} as const;
