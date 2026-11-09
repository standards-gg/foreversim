import i18n from '@i18n/config';
import { WOWSIMS_URL } from '@sim/constants/other';
import { Button } from '@ui-kit/Button';
import { Trans } from 'react-i18next';

import { FOOTER_GROUPS } from './footer_links';
import { LandingBrand } from './LandingBrand';

const FooterGroup = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
	<nav aria-labelledby={id} className="ui-landing-footer-group">
		<h2 id={id} className="ui-landing-footer-heading">
			{title}
		</h2>
		<ul className="ui-landing-footer-links">{children}</ul>
	</nav>
);

/** The Standards.gg footer: the brand, three link columns, and a legal line that credits WoWSims, whose code this site builds on. */
export const LandingFooter = () => (
	<footer className="ui-landing-footer">
		<div className="ui-landing-container">
			<div className="ui-landing-footer-columns">
				<div className="ui-landing-footer-brand">
					<LandingBrand />
					<p className="ui-landing-footer-tagline">{i18n.t('landing.footer.tagline')}</p>
				</div>
				{FOOTER_GROUPS.map(group => (
					<FooterGroup key={group.id} id={`landing-footer-${group.id}`} title={i18n.t(group.title)}>
						{group.links.map(link => (
							<li key={link.href}>
								<Button href={link.href} target="_blank" variant="unstyled" className="ui-landing-footer-link">
									{i18n.t(link.label)}
								</Button>
							</li>
						))}
					</FooterGroup>
				))}
			</div>
			<div className="ui-landing-footer-legal">
				<span>{i18n.t('landing.footer.copyright', { year: new Date().getFullYear() })}</span>
				<span className="ui-landing-footer-dot" aria-hidden="true">
					·
				</span>
				<span>
					<Trans
						i18n={i18n}
						i18nKey="landing.footer.builtOn"
						components={{ wowsims: <Button href={WOWSIMS_URL} target="_blank" variant="unstyled" className="ui-landing-footer-link" /> }}
					/>
				</span>
				<span className="ui-landing-footer-dot" aria-hidden="true">
					·
				</span>
				<span>{i18n.t('landing.footer.disclaimer')}</span>
			</div>
		</div>
	</footer>
);
