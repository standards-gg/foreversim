import {
	ADDON_URL,
	ATLAS_URL,
	DISCORD_URL,
	GITHUB_ORG_URL,
	GUIDE_URL,
	INSTAGRAM_URL,
	PATREON_URL,
	REPO_URL,
	STANDARDS_URL,
	TALENTS_URL,
	UPSTREAM_REPO_URL,
	YOUTUBE_URL,
} from '@sim/constants/other';

export interface FooterLink {
	href: string;
	/** The locale key of the link's text. */
	label: string;
}

export interface FooterGroup {
	id: string;
	/** The locale key of the column's heading. */
	title: string;
	links: readonly FooterLink[];
}

/** The footer's columns: the guild's other Forever tools, its channels, and the simulator's own links. */
export const FOOTER_GROUPS: readonly FooterGroup[] = [
	{
		id: 'standards',
		title: 'landing.footer.standards',
		links: [
			{ href: STANDARDS_URL, label: 'landing.footer.home' },
			{ href: ATLAS_URL, label: 'landing.footer.atlas' },
			{ href: TALENTS_URL, label: 'landing.footer.talents' },
			{ href: GUIDE_URL, label: 'landing.footer.guide' },
		],
	},
	{
		id: 'community',
		title: 'landing.footer.community',
		links: [
			{ href: DISCORD_URL, label: 'landing.footer.discord' },
			{ href: GITHUB_ORG_URL, label: 'landing.footer.github' },
			{ href: YOUTUBE_URL, label: 'landing.footer.youtube' },
			{ href: INSTAGRAM_URL, label: 'landing.footer.instagram' },
		],
	},
	{
		id: 'simulator',
		title: 'landing.footer.simulator',
		links: [
			{ href: REPO_URL, label: 'landing.footer.source' },
			{ href: UPSTREAM_REPO_URL, label: 'landing.footer.upstream' },
			{ href: ADDON_URL, label: 'landing.footer.addon' },
			{ href: PATREON_URL, label: 'landing.footer.patreon' },
		],
	},
];
