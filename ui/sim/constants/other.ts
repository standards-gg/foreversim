import { ProtoVersion } from '@generated/proto/common';
import { readMessageOption } from '@protobuf-ts/runtime';

export enum Phase {
	Phase1 = 1,
	Phase2,
	Phase3,
	Phase4,
	Phase5,
}

export const CURRENT_PHASE = Phase.Phase1;

export enum LaunchStatus {
	Unlaunched,
	// Gear, enchants, talents and the gear optimizer work. No simulation, and none planned.
	GearPlanner,
	Alpha,
	Beta,
	Launched,
}

export const CURRENT_API_VERSION: number = readMessageOption(ProtoVersion, 'proto.current_version_number')! as number;

// The site is served under the /forever directory, as on wowsims.com, so a page keeps its URL across both.
export const REPO_NAME = 'forever';
// The Standards.gg fork of wowsims/forever: commit, release and issue links point at it.
export const REPO_URL = 'https://github.com/standards-gg/foreversim';
export const REPO_RELEASES_URL = `${REPO_URL}/releases`;
// The repository whose CI built this page (see vite.config.mts). Empty for a build made outside
// GitHub Actions, which then offers no issue links at all.
export const ISSUES_REPO: string = import.meta.env.VITE_GITHUB_REPOSITORY;
export const REPO_NEW_ISSUE_URL = `https://github.com/${ISSUES_REPO}/issues/new`;
export const REPO_CHOOSE_NEW_ISSUE_URL = `${REPO_NEW_ISSUE_URL}/choose`;

// The project this fork builds on (MIT); the landing page credits and links it.
export const WOWSIMS_URL = 'https://www.wowsims.com/';
export const UPSTREAM_REPO_URL = 'https://github.com/wowsims/forever';
// Standards.gg, the HADAL guild's site, and its other WoW: Forever tools.
export const STANDARDS_URL = 'https://standards.gg/';
export const ATLAS_URL = 'https://atlas.standards.gg/';
export const TALENTS_URL = 'https://talents.standards.gg/';
export const GUIDE_URL = 'https://guide.standards.gg/';
export const YOUTUBE_URL = 'https://www.youtube.com/@standards-gg';
export const INSTAGRAM_URL = 'https://www.instagram.com/standards.gg';
export const DISCORD_URL = 'https://discord.gg/standards-gg';
export const GITHUB_ORG_URL = 'https://github.com/standards-dev';
export const ADDON_URL = 'https://www.curseforge.com/wow/addons/wowsimsexporter';
// WoWSims' Patreon until Standards.gg has its own.
export const PATREON_URL = 'https://www.patreon.com/wowsims';

export const SOCIALS = [
	{ key: 'discord', href: DISCORD_URL, className: 'ui-social-link', icon: 'discord', tooltip: 'info.discord' },
	{ key: 'github', href: REPO_URL, className: 'ui-social-link', icon: 'github', tooltip: 'info.github' },
	{
		key: 'patreon',
		href: PATREON_URL,
		className: 'ui-social-link',
		icon: 'patreon',
		tooltip: 'info.patreon',
		label: ' Patreon',
	},
] as const;

export type Social = (typeof SOCIALS)[number];

// Root-relative path of the individual sim page for the given spec. Resolve it
// against the page origin at the point of use (see SimTitleDropdown) — this
// layer has no `window`. Lives here rather than in proto/utils so that
// player/specs/<class>.ts (which calls it at module scope) does not import the
// proto <-> player/specs cycle; the evaluation order of that cycle decides
// whether PlayerSpecs' lookup table is populated.
export function getSpecSitePath(classString: string, specString: string): string {
	return `/${REPO_NAME}/${classString}/${specString}/`;
}

export const LOCAL_STORAGE_PREFIX = '__forever';

export enum SortDirection {
	ASC,
	DESC,
}
