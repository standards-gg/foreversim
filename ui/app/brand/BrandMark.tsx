import { BRAND } from '@sim/constants/brand';
import { Button } from '@ui-kit/Button';

// The wordmark's domain, in gold.
const dot = BRAND.name.lastIndexOf('.');
const [NAME, DOMAIN] = dot > 0 ? [BRAND.name.slice(0, dot), BRAND.name.slice(dot)] : [BRAND.name, ''];

/** The HADAL mark, the Standards.gg wordmark and the tagline, linking to standards.gg in the same tab. */
export const BrandMark = () => (
	<Button href={BRAND.url} variant="unstyled" className="ui-landing-brand" data-testid="landing-brand">
		<img className="ui-landing-brand-logo" src={BRAND.logo} alt="" />
		<span className="flex flex-col leading-none">
			<span className="ui-brand-mark-name" data-testid="brand-title">
				{NAME}
				<span className="ui-brand-mark-domain">{DOMAIN}</span>
			</span>
			<small className="ui-brand-mark-tagline">{BRAND.tagline}</small>
		</span>
	</Button>
);
