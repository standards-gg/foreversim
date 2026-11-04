import i18n from '@i18n/config';
import { BRAND, UPSTREAM } from '@sim/constants/brand';
import { ADDON_URL, DISCORD_URL, GITHUB_ORG_URL, PATREON_URL } from '@sim/constants/other';
import { Button } from '@ui-kit/Button';

import { BrandMark } from './BrandMark';

const SITE_LINKS = [
	{ href: DISCORD_URL, label: 'landing.header.discord' },
	{ href: GITHUB_ORG_URL, label: 'landing.header.github' },
	{ href: ADDON_URL, label: 'landing.footer.addon' },
] as const;

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<Button href={href} target="_blank" variant="unstyled" className="text-white/80 underline-offset-2 hover:text-white hover:underline">
		{children}
	</Button>
);

// The locale's line spans two years; the first year stands alone.
const copyright = (year: number) =>
	year === BRAND.copyrightStartYear
		? `© ${year} ${BRAND.name}`
		: i18n.t('landing.footer.copyright', { startYear: BRAND.copyrightStartYear, year, holder: BRAND.name });

/**
 * The landing page footer: the site's own links, the WoWSims attribution its MIT licence asks for, and the
 * legal line. Everything is in the bundle; nothing is fetched.
 */
export const BrandFooter = () => (
	<footer className="border-t border-solid border-white/8 bg-background/90 py-8 text-sm text-white/65">
		<div className="ui-landing-container flex flex-col gap-5">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<BrandMark />
				<ul className="m-0 flex list-none flex-wrap gap-x-5 p-0" data-testid="brand-footer-links">
					{SITE_LINKS.map(({ href, label }) => (
						<li key={href}>
							<FooterLink href={href}>{i18n.t(label)}</FooterLink>
						</li>
					))}
				</ul>
			</div>
			<p className="m-0" data-testid="brand-footer-upstream">
				Built on <FooterLink href={UPSTREAM.url}>{UPSTREAM.name}</FooterLink>, the open-source World of Warcraft simulator (
				<FooterLink href={`${UPSTREAM.repoUrl}/blob/master/LICENSE`}>MIT licence</FooterLink>, <FooterLink href={UPSTREAM.repoUrl}>source</FooterLink>).
				Support its developers on <FooterLink href={PATREON_URL}>Patreon</FooterLink>.
			</p>
			<p className="m-0 text-xs text-white/50" data-testid="brand-footer-legal">
				{copyright(new Date().getFullYear())}
				{' · '}
				{i18n.t('landing.footer.disclaimer')}
				{' · '}World of Warcraft® and its artwork are © Blizzard Entertainment.
			</p>
		</div>
	</footer>
);
