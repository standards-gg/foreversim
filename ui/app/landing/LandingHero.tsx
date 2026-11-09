import i18n from '@i18n/config';
import { WOWSIMS_URL } from '@sim/constants/other';
import { Button } from '@ui-kit/Button';
import { Trans } from 'react-i18next';

import { ReleaseInfo } from '../ReleaseInfo';
import { LandingActions } from './LandingActions';

export const LandingHero = () => (
	<section className="mb-12 flex max-w-landing-hero flex-col">
		<div className="flex flex-wrap items-baseline gap-x-6">
			<h1 className="ui-landing-hero-title" data-testid="landing-heading">
				<Trans i18n={i18n} i18nKey="landing.home.heading" components={{ expansion: <span className="ui-landing-hero-expansion" /> }} />
			</h1>
			<ReleaseInfo className="text-sm text-parchment-muted motion-safe:animate-landing-rise-in-slow" />
		</div>
		<p id="description" className="ui-landing-hero-blurb">
			<Trans
				i18n={i18n}
				i18nKey="landing.home.welcomeDescription"
				components={{
					brand: <strong className="text-brand" />,
					bold: <strong />,
					expansion: <strong className="text-parchment" />,
					wowsims: <Button href={WOWSIMS_URL} target="_blank" variant="unstyled" className="ui-landing-hero-link" />,
				}}
			/>
		</p>
		<LandingActions />
	</section>
);
