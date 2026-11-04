// Renders the spec backgrounds under assets/img/ from the Field Guides' art: their gradient scenes
// (src/bg), the class renders from the World of Warcraft Fan Site Kit (src/classart) and the class
// emblems (src/emblems), on the guides' navy with the class colour's glow. The files keep upstream's
// names, so ui/styles/theme/specs.css and the landing cards need no change.
//
//   node brand/backgrounds/render.cjs            writes every background
//   node brand/backgrounds/render.cjs warrior    only the warrior's
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(__dirname, 'src');
const OUT = path.join(ROOT, 'assets/img');
const W = 1800;
const H = 1000;

// The class colours and the guides' navy, as build_site.py and assets/style.css hold them.
const COLORS = {
	warrior: '#C79C6E',
	paladin: '#F58CBA',
	hunter: '#ABD473',
	rogue: '#FFF569',
	priest: '#FFFFFF',
	shaman: '#2f9bff',
	mage: '#69CCF0',
	warlock: '#9482C9',
	druid: '#FF7D0A',
};
const NAVY = '#070b17';

// Each spec page's file (the name specs.css reads), its class, and the gradient scene it gets, so sibling
// specs of one class differ. `side` puts the render on the right or the left of the frame.
const SPECS = [
	['balance_druid_background.jpg', 'druid', 0, 'right'],
	['feral_druid_tank_background.jpg', 'druid', 1, 'left'],
	['feral_druid_background.jpg', 'druid', 2, 'right'],
	['resto_druid_background.jpg', 'druid', 3, 'left'],
	['hunter_background.jpg', 'hunter', 4, 'right'],
	['mage_background.jpg', 'mage', 0, 'right'],
	['holy_paladin_background.jpg', 'paladin', 1, 'right'],
	['prot_paladin.jpg', 'paladin', 2, 'left'],
	['retribution_paladin.jpg', 'paladin', 3, 'right'],
	['healing_priest_background.jpg', 'priest', 4, 'right'],
	['shadow_priest_background.jpg', 'priest', 0, 'left'],
	['rogue_background.jpg', 'rogue', 1, 'right'],
	['elemental_shaman_background.jpg', 'shaman', 2, 'right'],
	['enhancement_shaman_background.jpg', 'shaman', 3, 'left'],
	['resto_shaman_background.jpg', 'shaman', 4, 'right'],
	['warlock_background.jpg', 'warlock', 0, 'right'],
	['warrior_background.jpg', 'warrior', 1, 'right'],
	['protection_warrior_background.jpg', 'warrior', 2, 'left'],
];

const dataUrl = (file, type) => `data:${type};base64,${fs.readFileSync(file).toString('base64')}`;

const page = (cls, variant, side) => {
	const color = COLORS[cls];
	const scene = dataUrl(path.join(SRC, 'bg', `${variant}.svg`), 'image/svg+xml');
	const art = dataUrl(path.join(SRC, 'classart', `${cls}.webp`), 'image/webp');
	const emblem = dataUrl(path.join(SRC, 'emblems', `${cls}.png`), 'image/png');
	const artX = side === 'right' ? 'right: 6%;' : 'left: 6%;';
	const emblemX = side === 'right' ? 'left: 9%;' : 'right: 9%;';
	const glowX = side === 'right' ? '14%' : '86%';
	return `<!doctype html><html><head><style>
		html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: ${NAVY}; }
		.layer { position: absolute; inset: 0; }
		.scene { background: url("${scene}") center / cover no-repeat; opacity: .72; }
		.navy { background: linear-gradient(180deg, rgba(7,11,23,.05) 0%, rgba(7,11,23,.45) 100%); }
		.glow { background: radial-gradient(900px 620px at ${glowX} 0%, color-mix(in srgb, ${color} 48%, transparent), transparent 70%); }
		.emblem { position: absolute; top: 50%; ${emblemX} width: 560px; height: 560px; transform: translateY(-50%);
			background: url("${emblem}") center / contain no-repeat; opacity: .1; filter: saturate(.7);
			-webkit-mask-image: radial-gradient(circle at 50% 50%, #000 38%, transparent 66%); mask-image: radial-gradient(circle at 50% 50%, #000 38%, transparent 66%); }
		.art { position: absolute; bottom: 0; ${artX} height: 86%; filter: drop-shadow(0 30px 50px rgba(0,0,0,.65)); opacity: .96; }
		.vignette { background: radial-gradient(ellipse at 50% 45%, rgba(3,4,10,0) 40%, rgba(3,4,10,.6) 100%); }
		.edge { background: linear-gradient(90deg, rgba(7,11,23,.75), rgba(7,11,23,0) 30%, rgba(7,11,23,0) 70%, rgba(7,11,23,.75)); }
	</style></head><body>
		<div class="layer scene"></div>
		<div class="layer navy"></div>
		<div class="layer glow"></div>
		<div class="emblem"></div>
		<img class="art" src="${art}" alt="">
		<div class="layer vignette"></div>
		<div class="layer edge"></div>
	</body></html>`;
};

(async () => {
	const only = process.argv[2];
	const browser = await chromium.launch();
	const tab = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
	for (const [file, cls, variant, side] of SPECS) {
		if (only && cls !== only) continue;
		await tab.setContent(page(cls, variant, side), { waitUntil: 'load' });
		await tab.screenshot({ path: path.join(OUT, file), type: 'jpeg', quality: 82 });
		console.log(file, `${(fs.statSync(path.join(OUT, file)).size / 1024).toFixed(0)} KB`);
	}
	await browser.close();
})();
