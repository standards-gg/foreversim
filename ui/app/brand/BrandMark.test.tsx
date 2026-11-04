import { BRAND } from '@sim/constants/brand';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BrandMark } from './BrandMark';

describe('BrandMark', () => {
	it('links the mark and the name to the site in the same tab', () => {
		render(<BrandMark />);
		const brand = screen.getByTestId('landing-brand');
		expect(brand.getAttribute('href')).toBe(BRAND.url);
		expect(brand.getAttribute('target')).toBeNull();
		expect(screen.getByTestId('brand-title').textContent).toBe(BRAND.name);
		expect(brand.querySelector('img')?.getAttribute('src')).toBe(BRAND.logo);
	});
});
