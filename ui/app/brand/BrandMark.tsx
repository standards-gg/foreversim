import { BRAND } from '@sim/constants/brand';
import { Button } from '@ui-kit/Button';

/** The Standards.gg mark, name and tagline, linking to standards.gg in the same tab. */
export const BrandMark = () => (
	<Button href={BRAND.url} variant="unstyled" className="ui-landing-brand" data-testid="landing-brand">
		<img className="ui-landing-brand-logo" src={BRAND.logo} alt="" />
		<span className="flex flex-col leading-none">
			<span className="text-xl font-bold text-brand" data-testid="brand-title">
				{BRAND.name}
			</span>
			<small className="mt-[0.2rem] text-[0.7rem] font-normal text-white/65">{BRAND.tagline}</small>
		</span>
	</Button>
);
