import i18n from '@i18n/config';
import { BRAND, UPSTREAM } from '@sim/constants/brand';
import { ADDON_URL, DISCORD_URL, GITHUB_ORG_URL, PATREON_URL } from '@sim/constants/other';
import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import english from '../../../assets/locales/en/translation.json';
import { BrandFooter } from './BrandFooter';

beforeAll(() => {
	i18n.addResourceBundle('en', 'translation', english, true, true);
});
afterAll(() => {
	i18n.removeResourceBundle('en', 'translation');
});

describe('BrandFooter', () => {
	it('links Discord, GitHub and the addon in new tabs', () => {
		render(<BrandFooter />);
		const links: [string, string][] = [
			['landing.header.discord', DISCORD_URL],
			['landing.header.github', GITHUB_ORG_URL],
			['landing.footer.addon', ADDON_URL],
		];
		links.forEach(([label, url]) => {
			const link = screen.getByRole('link', { name: i18n.t(label) });
			expect(link.getAttribute('href')).toBe(url);
			expect(link.getAttribute('target')).toBe('_blank');
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

	it('names the site holder and the fan-project disclaimer in the legal line', () => {
		render(<BrandFooter />);
		const legal = screen.getByTestId('brand-footer-legal').textContent;
		const year = new Date().getFullYear();
		expect(legal).toContain(year === BRAND.copyrightStartYear ? `© ${year} ${BRAND.name}` : `© ${BRAND.copyrightStartYear}-${year} ${BRAND.name}`);
		expect(legal).toContain(i18n.t('landing.footer.disclaimer'));
	});
});
