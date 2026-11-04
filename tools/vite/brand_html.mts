// The page heads of the Standards.gg site. `ui/index.html` and `ui/index_template.html` carry the WoWSims
// title, description, canonical and social-preview tags, icons, Google Analytics, the wowsims.com footer
// stylesheet and a schema.org block; this plugin rewrites or drops them from ui/sim/constants/brand.ts, so the
// templates stay upstream's and `git merge upstream/master` meets no edit of ours in them.
//
// The landing page and the template pass through `transformIndexHtml` before vite processes them, in dev and in
// the build. The spec pages are copies of the processed template that spec_pages.mts emits in `generateBundle`
// with their own title, description and wowsims.com URLs; this plugin is registered after it, so its own
// `generateBundle` sees those copies and moves their canonical and `og:url` links to the site's origin.
import type { Plugin } from 'vite';

import { BRAND, BRAND_STRINGS } from '../../ui/sim/constants/brand.js';

/** The production origin of the WoWSims site, which the templates and spec_pages.mts write absolute links with. */
const UPSTREAM_ORIGIN = 'https://www.wowsims.com';

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The formatter wraps a long tag one attribute per line, so attributes are split by any whitespace.
const tag = (name: string, key: string, valueAttr: string) => new RegExp(`(<${name}\\s+${key}\\s+${valueAttr}=")[^"]*(")`);

/** The tags every page carries; one the template lacks fails the build, so an upstream change surfaces here. */
const REQUIRED: [RegExp, string][] = [
	[/(<title>)[^<]*(<\/title>)/, escapeHtml(BRAND_STRINGS.landing.home.title)],
	[tag('meta', 'name="description"', 'content'), escapeHtml(BRAND_STRINGS.landing.home.description)],
	[tag('link', 'rel="canonical"', 'href'), `${BRAND.origin}/forever/`],
	[tag('meta', 'property="og:site_name"', 'content'), BRAND.name],
	[tag('meta', 'property="og:url"', 'content'), `${BRAND.origin}/forever/`],
	[tag('meta', 'property="og:title"', 'content'), escapeHtml(BRAND_STRINGS.landing.home.title)],
	[tag('meta', 'property="og:description"', 'content'), escapeHtml(BRAND_STRINGS.landing.home.description)],
	[tag('meta', 'property="og:image"', 'content'), `${BRAND.origin}${BRAND.socialImage.path}`],
	[tag('meta', 'name="twitter:title"', 'content'), escapeHtml(BRAND_STRINGS.landing.home.title)],
	[tag('meta', 'name="twitter:description"', 'content'), escapeHtml(BRAND_STRINGS.landing.home.description)],
	[tag('meta', 'name="twitter:image"', 'content'), `${BRAND.origin}${BRAND.socialImage.path}`],
	[tag('link', 'rel="icon"\\s+type="image/x-icon"', 'href'), BRAND.favicon],
	[tag('link', 'rel="apple-touch-icon"', 'href'), BRAND.appleTouchIcon],
];

/** Tags only some pages carry, rewritten where present. */
const OPTIONAL: [RegExp, string][] = [
	[tag('meta', 'property="og:image:width"', 'content'), String(BRAND.socialImage.width)],
	[tag('meta', 'property="og:image:height"', 'content'), String(BRAND.socialImage.height)],
	[tag('meta', 'property="og:image:alt"', 'content'), BRAND.socialImage.alt],
];

/** What the site does not ship: the analytics of wowsims.com, its footer stylesheet and its schema.org block. */
const DROPPED: RegExp[] = [
	/[ \t]*<!-- Global site tag \(gtag\.js\) - Google Analytics -->\r?\n/,
	/[ \t]*<link rel="stylesheet" href="https:\/\/www\.wowsims\.com\/footer\.css" \/>\r?\n/,
	/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\r?\n/,
];

// The UI calls `gtag` for page views and events (ui/tracking/utils.ts), so the global stays as a no-op when the
// Google Analytics loader and its dataLayer setup go.
const ANALYTICS =
	/[ \t]*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"]*"><\/script>\r?\n[ \t]*<script>\s*window\.dataLayer[\s\S]*?<\/script>/;
const ANALYTICS_STUB = '<script>\n\t\t\tfunction gtag() {}\n\t\t</script>';

const rewrite = (html: string, replacements: [RegExp, string][], required: boolean): string =>
	replacements.reduce((page, [pattern, value]) => {
		if (!pattern.test(page)) {
			if (required) throw new Error(`brand-html: no tag matching ${pattern} in the page.`);
			return page;
		}
		return page.replace(pattern, (_, open, close) => `${open}${value}${close}`);
	}, html);

/** A template's head with the site's own tags. */
export function brandPage(html: string): string {
	if (!ANALYTICS.test(html)) throw new Error('brand-html: no Google Analytics block in the page.');
	const page = DROPPED.reduce((text, pattern) => text.replace(pattern, ''), html.replace(ANALYTICS, ANALYTICS_STUB));
	return rewrite(rewrite(page, REQUIRED, true), OPTIONAL, false);
}

/** A spec page copy with its absolute links moved to the site's origin. */
export const brandSpecPage = (html: string): string => html.replaceAll(UPSTREAM_ORIGIN, BRAND.origin);

export function brandHtml(): Plugin {
	return {
		name: 'brand-html',
		// After spec-pages, whose `generateBundle` emits the spec page copies this one rewrites.
		enforce: 'post',
		transformIndexHtml: {
			// Before vite's own transform, so the tags are rewritten as they stand in the template.
			order: 'pre',
			handler: html => brandPage(html),
		},
		generateBundle(_options, bundle) {
			for (const asset of Object.values(bundle)) {
				if (asset.type === 'asset' && asset.fileName.endsWith('.html')) {
					asset.source = brandSpecPage(String(asset.source));
				}
			}
		},
	};
}
