import i18n from '@i18n/config';
import { BRAND, UPSTREAM } from '@sim/constants/brand';
import { PATREON_URL } from '@sim/constants/other';
import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import english from '../../../assets/locales/en/translation.json';
import { BrandFooter, FOOTER_COLUMNS } from './BrandFooter';

beforeAll(() => {
	i18n.addResourceBundle('en', 'translation', english, true, true);
});
afterAll(() => {
	i18n.removeResourceBundle('en', 'translation');
});

describe('BrandFooter', () => {
	it('names every column and opens each of its links in a new tab with no opener', () => {
		render(<BrandFooter />);
		FOOTER_COLUMNS.forEach(column => {
			expect(screen.getByRole('navigation', { name: column.title })).toBeTruthy();
			column.links.forEach(link => {
				const anchor = screen.getByRole('link', { name: link.label });
				expect(anchor.getAttribute('href')).toBe(link.href);
				expect(anchor.getAttribute('target')).toBe('_blank');
				expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
			});
		});
	});

	it('credits WoWSims with its site, licence, source and Patreon', () => {
		render(<BrandFooter />);
		const upstream = screen.getByTestId('brand-footer-upstream');
		expect(screen.getByRole('link', { name: UPSTREAM.name }).getAttribute('href')).toBe(UPSTREAM.url);
		expect(screen.getByRole('link', { name: 'MIT licence' }).getAttribute('href')).toBe(`${UPSTREAM.repoUrl}/blob/master/LICENSE`);
		expect(screen.getByRole('link', { name: 'source' }).getAttribute('href')).toBe(UPSTREAM.repoUrl);
		expect(screen.getByRole('link', { name: 'Patreon' }).getAttribute('href')).toBe(PATREON_URL);
		expect(upstream.textContent).toContain('Built on WoWSims');
	});

	it('names the site holder, the guild and the fan-project disclaimer in the legal line', () => {
		render(<BrandFooter />);
		const legal = screen.getByTestId('brand-footer-legal').textContent;
		const year = new Date().getFullYear();
		expect(legal).toContain(year === BRAND.copyrightStartYear ? `© ${year} ${BRAND.name}` : `© ${BRAND.copyrightStartYear}-${year} ${BRAND.name}`);
		expect(legal).toContain('HADAL');
		expect(legal).toContain(i18n.t('landing.footer.disclaimer'));
	});
});
