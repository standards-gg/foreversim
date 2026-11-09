import i18n from '@i18n/config';
import { WOWSIMS_URL } from '@sim/constants/other';
import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import english from '../../../assets/locales/en/translation.json';
import { FOOTER_GROUPS } from './footer_links';
import { LandingFooter } from './LandingFooter';

beforeAll(() => {
	i18n.addResourceBundle('en', 'translation', english, true, true);
});
afterAll(() => {
	i18n.removeResourceBundle('en', 'translation');
});

describe('LandingFooter', () => {
	it('names every column and opens each of its links in a new tab with no opener', () => {
		render(<LandingFooter />);
		FOOTER_GROUPS.forEach(group => {
			expect(screen.getByRole('navigation', { name: i18n.t(group.title) })).toBeTruthy();
			group.links.forEach(link => {
				const anchor = screen.getByRole('link', { name: i18n.t(link.label) });
				expect(anchor.getAttribute('href')).toBe(link.href);
				expect(anchor.getAttribute('target')).toBe('_blank');
				expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
			});
		});
	});

	it('closes with the copyright, the WoWSims credit linked to wowsims.com, and the disclaimer', () => {
		render(<LandingFooter />);
		const legal = screen.getByRole('contentinfo').textContent;
		expect(legal).toContain(`© ${new Date().getFullYear()} Standards.gg · HADAL`);
		expect(legal).toContain('Built on WoWSims (MIT)');
		expect(legal).toContain(i18n.t('landing.footer.disclaimer'));
		const credit = screen.getByRole('link', { name: 'WoWSims' });
		expect(credit.getAttribute('href')).toBe(WOWSIMS_URL);
		expect(credit.getAttribute('target')).toBe('_blank');
	});
});
