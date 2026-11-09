import i18n from '@i18n/config';
import { BRAND, UPSTREAM } from '@sim/constants/brand';
import { ADDON_URL, DISCORD_URL, GITHUB_ORG_URL, PATREON_URL } from '@sim/constants/other';
import { Button } from '@ui-kit/Button';
import type { ReactNode } from 'react';

import { BrandMark } from './BrandMark';

export interface FooterColumn {
	id: string;
	title: string;
	links: readonly { href: string; label: string }[];
}

/** The footer's columns: the guild's other Forever tools, its channels, and the simulator's own links. */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
	{
		id: 'tools',
		title: BRAND.name,
		links: [
			{ href: BRAND.url, label: 'standards.gg' },
			{ href: BRAND.atlasUrl, label: 'Forever Atlas' },
			{ href: BRAND.talentsUrl, label: 'Talent Calculator' },
			{ href: BRAND.guideUrl, label: 'Forever Guide' },
		],
	},
	{
		id: 'community',
		title: 'Community',
		links: [
			{ href: DISCORD_URL, label: 'Discord' },
			{ href: GITHUB_ORG_URL, label: 'GitHub' },
			{ href: BRAND.youtubeUrl, label: 'YouTube' },
			{ href: BRAND.instagramUrl, label: 'Instagram' },
		],
	},
	{
		id: 'simulator',
		title: 'Simulator',
		links: [
			{ href: BRAND.repoUrl, label: 'Source on GitHub' },
			{ href: UPSTREAM.repoUrl, label: 'WoWSims upstream' },
			{ href: ADDON_URL, label: 'Exporter addon' },
		],
	},
];

const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => (
	<Button href={href} target="_blank" variant="unstyled" className="ui-brand-footer-link">
		{children}
	</Button>
);

// The locale's line spans two years; the first year stands alone.
const copyright = (year: number) =>
	year === BRAND.copyrightStartYear
		? `© ${year} ${BRAND.name}`
		: i18n.t('landing.footer.copyright', { startYear: BRAND.copyrightStartYear, year, holder: BRAND.name });

/**
 * The landing page footer: the brand, three link columns, the WoWSims attribution its MIT licence asks for, and
 * the legal line. Everything is in the bundle; nothing is fetched.
 */
export const BrandFooter = () => (
	<footer className="ui-brand-footer">
		<div className="ui-landing-container">
			<div className="ui-brand-footer-columns">
				<div>
					<BrandMark />
					<p className="ui-brand-footer-tagline">The HADAL guild's tools for World of Warcraft®: Forever.</p>
				</div>
				{FOOTER_COLUMNS.map(column => (
					<nav key={column.id} aria-labelledby={`brand-footer-${column.id}`}>
						<h2 id={`brand-footer-${column.id}`} className="ui-brand-footer-heading">
							{column.title}
						</h2>
						<ul className="ui-brand-footer-links" data-testid="brand-footer-links">
							{column.links.map(link => (
								<li key={link.href}>
									<FooterLink href={link.href}>{link.label}</FooterLink>
								</li>
							))}
						</ul>
					</nav>
				))}
			</div>
			<div className="ui-brand-footer-legal">
				<p data-testid="brand-footer-upstream">
					Built on <FooterLink href={UPSTREAM.url}>{UPSTREAM.name}</FooterLink>, the open-source World of Warcraft simulator (
					<FooterLink href={`${UPSTREAM.repoUrl}/blob/master/LICENSE`}>MIT licence</FooterLink>,{' '}
					<FooterLink href={UPSTREAM.repoUrl}>source</FooterLink>). Support its developers on <FooterLink href={PATREON_URL}>Patreon</FooterLink>.
				</p>
				<p data-testid="brand-footer-legal">
					{copyright(new Date().getFullYear())}
					{' · HADAL · '}
					{i18n.t('landing.footer.disclaimer')}
					{' · '}World of Warcraft® and Blizzard Entertainment® are trademarks or registered trademarks of Blizzard Entertainment, Inc. The class
					artwork comes from the World of Warcraft Fan Site Kit, © Blizzard Entertainment, Inc., shown here in a free fan-made tool.
				</p>
			</div>
		</div>
	</footer>
);
