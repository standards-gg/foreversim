// The Standards.gg layer over the WoWSims Forever site: every name, link and image the fork changes, in one
// place. The site build writes the page heads from it (tools/vite/brand_html.mts), the landing page draws its
// header mark and footer from it (ui/app/brand/), and brand/README.md lists every file the layer reaches.
export const BRAND = {
	name: 'Standards.gg',
	product: 'Forever Sim',
	tagline: 'World of Warcraft: Forever simulator',
	url: 'https://standards.gg/',
	// The origin the site is served from. Canonical and social-preview links are absolute, so a move to
	// another host changes this and nothing else.
	origin: 'https://sim.standards.gg',
	discordUrl: 'https://discord.gg/standards-gg',
	// The standards.gg GitHub organisation; the fork itself is repoUrl.
	githubUrl: 'https://github.com/standards-dev',
	repoUrl: 'https://github.com/standards-gg/foreversim',
	// The in-game exporter, the Standards.gg fork of WowSimsExporter: its releases page until it is on CurseForge,
	// and the releases API the importer reads the current version from.
	addonUrl: 'https://github.com/standards-gg/foreversim-exporter/releases',
	addonReleasesApi: 'https://api.github.com/repos/standards-gg/foreversim-exporter/releases/latest',
	// WoWSims' Patreon until Standards.gg has its own.
	patreonUrl: 'https://www.patreon.com/wowsims',
	// The guild's other Forever tools and its channels, in the landing footer.
	atlasUrl: 'https://atlas.standards.gg/',
	talentsUrl: 'https://talents.standards.gg/',
	guideUrl: 'https://guide.standards.gg/',
	youtubeUrl: 'https://www.youtube.com/@standards-gg',
	instagramUrl: 'https://www.instagram.com/standards.gg',
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
// and description (its page head and its runtime title), its heading, welcome text and Discord button, the label
// over the spec name in a spec page's header, and the tour's welcome. The spec pages' own titles name no site.
export const BRAND_STRINGS = {
	landing: {
		home: {
			title: `${BRAND.name} ${BRAND.product} - World of Warcraft Forever DPS & Gear Simulators`,
			description:
				'Free World of Warcraft® Forever DPS and gear simulators by Standards.gg, built on the open-source WoWSims engine. Sim your DPS, compare gear and optimize your character.',
			heading: `<expansion>Forever</expansion> ${BRAND.product.replace(/^Forever /, '')}`,
			welcomeDescription:
				"<brand>Standards.gg</brand> is the HADAL guild's home for <expansion>World of Warcraft®: Forever</expansion>: the Atlas, the Talent Calculator, the Guide and now this simulator. Sim your DPS, compare gear and find the upgrade that counts. The engine is <bold>WoWSims</bold>, the fan-made open-source simulator that has covered every Classic release since 2021, and we build on it in the open.",
		},
		actions: { discord: 'Join the Discord' },
		header: { addon: 'Download the ForeverSims Exporter addon' },
	},
	import: { addon: { addon_link: 'ForeverSims Exporter in-game addon' } },
	bulk_tab: {
		import_modal: { description_line1: 'Import bag items from a JSON file, which can be created by the ForeverSims Exporter in-game addon.' },
	},
	onboarding: {
		steps: {
			welcome: { title: `Welcome to ${BRAND.product}` },
			import: { body: 'Bring in your character with the <addon>ForeverSims Exporter addon</addon>, or a build from a link someone shared.' },
		},
	},
	sidebar: { header: { title: `${BRAND.name} - ${BRAND.product}` } },
} as const;
