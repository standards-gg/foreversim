import i18n from '@i18n/config';
import { WOWSIMS_URL } from '@sim/constants/other';
import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import english from '../../../assets/locales/en/translation.json';
import { LandingHero } from './LandingHero';

beforeAll(() => {
	i18n.addResourceBundle('en', 'translation', english, true, true);
});
afterAll(() => {
	i18n.removeResourceBundle('en', 'translation');
});

describe('LandingHero', () => {
	it('heads the page with the expansion name and renders the welcome text without its markup tags', () => {
		render(<LandingHero />);
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Forever Simulator');
		const blurb = document.getElementById('description');
		expect(blurb?.textContent).toMatch(/^Standards\.gg is the HADAL guild's home/);
		expect(blurb?.textContent).not.toMatch(/<\w+>/);
	});

	it('links the WoWSims credit in the welcome text to wowsims.com in a new tab', () => {
		render(<LandingHero />);
		const link = screen.getByRole('link', { name: 'WoWSims' });
		expect(link.getAttribute('href')).toBe(WOWSIMS_URL);
		expect(link.getAttribute('target')).toBe('_blank');
		expect(link.getAttribute('rel')).toBe('noopener noreferrer');
	});
});
