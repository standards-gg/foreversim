import i18n from '@i18n/config';
import { STANDARDS_URL } from '@sim/constants/other';
import { Button } from '@ui-kit/Button';

/** The HADAL mark and the Standards.gg wordmark, its top-level domain in gold, linking to standards.gg in the same tab. */
export const LandingBrand = () => {
	const brand = i18n.t('landing.header.brand');
	const dot = brand.lastIndexOf('.');
	const [name, domain] = dot > 0 ? [brand.slice(0, dot), brand.slice(dot)] : [brand, ''];
	return (
		<Button href={STANDARDS_URL} variant="unstyled" className="ui-landing-brand" data-testid="landing-brand">
			<img className="ui-landing-brand-logo" src="/forever/assets/img/standards-gg-hadal-mark.svg" alt="" />
			<span className="flex flex-col leading-none">
				<span className="ui-landing-brand-name" data-testid="brand-title">
					{name}
					<span className="text-brand">{domain}</span>
				</span>
				<small className="ui-landing-brand-subtitle">{i18n.t('landing.header.subtitle')}</small>
			</span>
		</Button>
	);
};
