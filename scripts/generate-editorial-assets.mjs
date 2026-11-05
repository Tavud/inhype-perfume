import fs from 'fs';
import path from 'path';

const publicImagesDir = path.join(process.cwd(), 'public', 'images');
const perfumesDir = path.join(publicImagesDir, 'perfumes');

fs.mkdirSync(perfumesDir, { recursive: true });

const products = [
  {
    slug: 'velours-d-ombre',
    brand: 'MAISON CRIVELLI',
    name: 'Velours d’Ombre',
    type: 'EXTRAIT DE PARFUM',
    liquidColor: '#4A1F28',
    glowColor: '#8B3A4A',
    accentColor: '#B7A58D',
    notes: 'VETIVER · CACAO · LABDANUM',
    bottleShape: 'monolith',
  },
  {
    slug: 'iris-mineral',
    brand: 'ATELIER MATERI',
    name: 'Iris Minéral',
    type: 'EAU DE PARFUM',
    liquidColor: '#D6CBB9',
    glowColor: '#EDE5D9',
    accentColor: '#B7A58D',
    notes: 'IRIS PALLIDA · MINERAL STONE · WHITE MUSK',
    bottleShape: 'cylinder',
  },
  {
    slug: 'cuir-de-steppe',
    brand: 'INHYPE ATELIER',
    name: 'Cuir de Steppe',
    type: 'ATELIER EDITION',
    liquidColor: '#7A4928',
    glowColor: '#B78352',
    accentColor: '#EDE5D9',
    notes: 'SAFFRON · BLOND SUEDE · SANDALWOOD',
    bottleShape: 'apothecary',
  },
  {
    slug: 'lumiere-de-neroli',
    brand: 'MATIERE PREMIERE',
    name: 'Lumière de Néroli',
    type: 'EAU DE PARFUM',
    liquidColor: '#C9A769',
    glowColor: '#E5CFA0',
    accentColor: '#B7A58D',
    notes: 'TUNISIAN NEROLI · FIG LEAF · PETITGRAIN',
    bottleShape: 'cylinder',
  },
  {
    slug: 'ambre-santal-nocturne',
    brand: 'BDK PARFUMS',
    name: 'Ambre Santal Nocturne',
    type: 'EXTRAIT DE PARFUM',
    liquidColor: '#59291F',
    glowColor: '#9E523B',
    accentColor: '#B7A58D',
    notes: 'BLACK VANILLA · BENZOIN · MYSORE SANTAL',
    bottleShape: 'octagon',
  },
  {
    slug: 'rose-encens-brut',
    brand: 'LIQUIDES IMAGINAIRES',
    name: 'Rose Encens Brut',
    type: 'EAU DE PARFUM',
    liquidColor: '#632F39',
    glowColor: '#994757',
    accentColor: '#EDE5D9',
    notes: 'TURKISH ROSE · OLIBANUM · PAPYRUS',
    bottleShape: 'amphora',
  },
  {
    slug: 'cedre-blanc-vapeur',
    brand: 'BYREDO',
    name: 'Cèdre Blanc Vapeur',
    type: 'EAU DE PARFUM',
    liquidColor: '#B8B2A6',
    glowColor: '#DFD9CE',
    accentColor: '#171615',
    notes: 'HINOKI WOOD · PINE NEEDLE · SENCHA',
    bottleShape: 'cylinder',
  },
  {
    slug: 'atelier-discovery-coffret',
    brand: 'INHYPE ATELIER',
    name: 'Discovery Coffret',
    type: '5 × 3 ML ATOMIZERS',
    liquidColor: '#9E7B56',
    glowColor: '#CDBFA9',
    accentColor: '#632F39',
    notes: 'FIVE SIGNATURE OLFACTORY PROFILES',
    bottleShape: 'coffret',
  },
];

function createBottleView1(p) {
  if (p.bottleShape === 'coffret') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <radialGradient id="bg" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stop-color="#2B2623"/>
          <stop offset="55%" stop-color="#1A1817"/>
          <stop offset="100%" stop-color="#11100F"/>
        </radialGradient>
        <linearGradient id="vial" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#EDE5D9" stop-opacity="0.45"/>
          <stop offset="30%" stop-color="#B7A58D" stop-opacity="0.2"/>
          <stop offset="70%" stop-color="#632F39" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#EDE5D9" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#bg)"/>
      <circle cx="400" cy="440" r="240" fill="${p.glowColor}" opacity="0.12"/>
      <!-- Travertine Pedestal -->
      <polygon points="140,760 660,760 720,890 80,890" fill="#272421" stroke="#B7A58D" stroke-opacity="0.25"/>
      <rect x="140" y="760" width="520" height="18" fill="#3A3530"/>
      <!-- Open Luxury Coffret Box -->
      <rect x="190" y="310" width="420" height="450" rx="4" fill="#EDE5D9" stroke="#B7A58D" stroke-width="2"/>
      <rect x="212" y="332" width="376" height="406" fill="#171615"/>
      <!-- 5 Glass Vials -->
      ${[0, 1, 2, 3, 4]
        .map((i) => {
          const x = 242 + i * 66;
          return `
          <g>
            <rect x="${x}" y="390" width="38" height="48" rx="2" fill="#B7A58D"/>
            <rect x="${x + 4}" y="438" width="30" height="12" fill="#632F39"/>
            <rect x="${x}" y="450" width="38" height="225" rx="3" fill="url(#vial)" stroke="#EDE5D9" stroke-opacity="0.45"/>
            <rect x="${x + 3}" y="485" width="32" height="175" fill="${p.liquidColor}" opacity="${0.45 + i * 0.08}"/>
            <rect x="${x + 4}" y="515" width="30" height="95" fill="#EDE5D9"/>
            <text x="${x + 19}" y="555" text-anchor="middle" font-family="Georgia, serif" font-size="7" fill="#171615" letter-spacing="1">INHYPE</text>
            <text x="${x + 19}" y="572" text-anchor="middle" font-family="sans-serif" font-size="6" fill="#632F39">N°0${i + 1}</text>
          </g>`;
        })
        .join('')}
      <text x="400" y="835" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#EDE5D9" letter-spacing="4">${p.name.toUpperCase()}</text>
      <text x="400" y="862" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#B7A58D" letter-spacing="3">${p.notes}</text>
    </svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <defs>
      <radialGradient id="studioGlow" cx="50%" cy="44%" r="60%">
        <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.28"/>
        <stop offset="50%" stop-color="#221E1D" stop-opacity="0.92"/>
        <stop offset="100%" stop-color="#141312" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.22"/>
        <stop offset="20%" stop-color="${p.liquidColor}" stop-opacity="0.72"/>
        <stop offset="80%" stop-color="${p.liquidColor}" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#0D0C0C" stop-opacity="0.95"/>
      </linearGradient>
      <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#171615"/>
        <stop offset="35%" stop-color="#3A3531"/>
        <stop offset="55%" stop-color="#B7A58D"/>
        <stop offset="85%" stop-color="#1F1D1B"/>
        <stop offset="100%" stop-color="#121110"/>
      </linearGradient>
      <linearGradient id="plinth" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2C2825"/>
        <stop offset="100%" stop-color="#171615"/>
      </linearGradient>
    </defs>

    <!-- Studio Background -->
    <rect width="800" height="1000" fill="#141312"/>
    <rect width="800" height="1000" fill="url(#studioGlow)"/>

    <!-- Architectural Shadow Beam -->
    <polygon points="0,160 800,40 800,280 0,460" fill="#EDE5D9" opacity="0.025"/>
    <circle cx="400" cy="450" r="220" fill="${p.glowColor}" opacity="0.1"/>

    <!-- Travertine Stone Plinth -->
    <polygon points="170,740 630,740 690,820 110,820" fill="#332E2A"/>
    <rect x="110" y="820" width="580" height="180" fill="url(#plinth)"/>
    <line x1="110" y1="820" x2="690" y2="820" stroke="#B7A58D" stroke-opacity="0.35" stroke-width="1.5"/>

    <!-- Bottle Shadow on Plinth -->
    <ellipse cx="400" cy="775" rx="135" ry="22" fill="#090808" opacity="0.75"/>

    <!-- Perfume Flacon -->
    <g transform="translate(0, 10)">
      <!-- Heavy Cap -->
      <rect x="342" y="210" width="116" height="96" rx="4" fill="url(#capGrad)" stroke="#B7A58D" stroke-opacity="0.4"/>
      <rect x="368" y="306" width="64" height="24" fill="#B7A58D"/>
      <line x1="342" y1="230" x2="458" y2="230" stroke="#B7A58D" stroke-opacity="0.45"/>

      <!-- Outer Thick Glass Flacon -->
      <rect x="265" y="330" width="270" height="430" rx="${p.bottleShape === 'cylinder' ? '38' : p.bottleShape === 'apothecary' ? '26' : '8'}" fill="url(#glassBody)" stroke="#EDE5D9" stroke-opacity="0.45" stroke-width="2"/>

      <!-- Inner Liquid Chamber & Heavy Glass Base -->
      <rect x="283" y="352" width="234" height="360" rx="${p.bottleShape === 'cylinder' ? '26' : '4'}" fill="${p.liquidColor}" opacity="0.68"/>
      <!-- Internal Atomizer Tube -->
      <path d="M400,330 Q402,520 390,710" stroke="#EDE5D9" stroke-opacity="0.35" stroke-width="2.5" fill="none"/>
      <!-- Glass Highlight Left -->
      <rect x="278" y="345" width="14" height="390" rx="6" fill="#FFFFFF" opacity="0.18"/>
      <!-- Glass Base Refraction -->
      <path d="M267,715 L533,715 L520,756 L280,756 Z" fill="#EDE5D9" opacity="0.16"/>

      <!-- Textured Ivory Atelier Label -->
      <rect x="304" y="430" width="192" height="215" fill="#EDE5D9" stroke="#B7A58D" stroke-width="1.5"/>
      <rect x="312" y="438" width="176" height="199" fill="none" stroke="#171615" stroke-opacity="0.22" stroke-width="0.8"/>

      <!-- Label Typography -->
      <text x="400" y="468" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="600" fill="#632F39" letter-spacing="3">${p.brand.replace(' · DEMO', '')}</text>
      <line x1="355" y1="482" x2="445" y2="482" stroke="#B7A58D" stroke-width="1"/>
      <text x="400" y="526" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#171615" letter-spacing="1">${p.name}</text>
      <text x="400" y="556" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#5A534A" letter-spacing="2.5">${p.type}</text>
      <text x="400" y="612" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#171615" letter-spacing="3.5">INHYPE ATELIER</text>
    </g>

    <!-- Subtle Editorial Footer Note -->
    <text x="400" y="925" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#B7A58D" letter-spacing="4" opacity="0.8">${p.notes}</text>
  </svg>`;
}

function createBottleView2(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E1C1A"/>
        <stop offset="100%" stop-color="#121110"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#bg2)"/>
    <circle cx="430" cy="480" r="260" fill="${p.glowColor}" opacity="0.14"/>
    <rect x="80" y="770" width="640" height="160" fill="#25221F" stroke="#B7A58D" stroke-opacity="0.25"/>

    <!-- Presentation Box on Left -->
    <g transform="translate(175, 250)">
      <rect x="0" y="0" width="230" height="520" fill="#EDE5D9" stroke="#B7A58D" stroke-width="2"/>
      <rect x="14" y="14" width="202" height="492" fill="none" stroke="#171615" stroke-opacity="0.2"/>
      <text x="115" y="120" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#171615" letter-spacing="5">INHYPE</text>
      <text x="115" y="142" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#632F39" letter-spacing="4">PERFUME ATELIER</text>
      <line x1="65" y1="240" x2="165" y2="240" stroke="#B7A58D"/>
      <text x="115" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#171615">${p.name}</text>
      <text x="115" y="308" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#5A534A" letter-spacing="2.5">${p.type}</text>
      <rect x="75" y="420" width="80" height="24" fill="#632F39"/>
      <text x="115" y="436" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#EDE5D9" letter-spacing="2">KAZAKHSTAN</text>
    </g>

    <!-- Bottle Next to Box -->
    <g transform="translate(380, 320)">
      <rect x="68" y="0" width="84" height="72" rx="3" fill="#171615" stroke="#B7A58D" stroke-opacity="0.5"/>
      <rect x="88" y="72" width="44" height="18" fill="#B7A58D"/>
      <rect x="15" y="90" width="190" height="360" rx="12" fill="${p.liquidColor}" fill-opacity="0.82" stroke="#EDE5D9" stroke-opacity="0.5" stroke-width="2"/>
      <rect x="42" y="175" width="136" height="165" fill="#EDE5D9"/>
      <text x="110" y="218" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#632F39" letter-spacing="2">${p.brand.replace(' · DEMO', '')}</text>
      <text x="110" y="258" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="#171615">${p.name}</text>
      <text x="110" y="284" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#5A534A" letter-spacing="2">${p.type}</text>
    </g>

    <text x="400" y="860" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#B7A58D" letter-spacing="4">ATELIER PRESENTATION &amp; PACKAGING</text>
  </svg>`;
}

function createBottleView3(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#171615"/>
    <circle cx="400" cy="500" r="290" fill="${p.liquidColor}" opacity="0.24"/>
    <circle cx="400" cy="500" r="220" fill="none" stroke="#B7A58D" stroke-opacity="0.3" stroke-dasharray="4 6"/>
    <circle cx="400" cy="500" r="150" fill="none" stroke="#EDE5D9" stroke-opacity="0.2"/>
    <rect x="140" y="180" width="520" height="640" fill="none" stroke="#B7A58D" stroke-opacity="0.25"/>
    <text x="400" y="270" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#B7A58D" letter-spacing="5">OLFACTORY ARCHITECTURE</text>
    <text x="400" y="485" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#EDE5D9" letter-spacing="2">${p.name}</text>
    <line x1="320" y1="515" x2="480" y2="515" stroke="#632F39" stroke-width="2"/>
    <text x="400" y="555" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#B7A58D" letter-spacing="3.5">${p.notes}</text>
    <text x="400" y="740" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#EDE5D9" opacity="0.7" letter-spacing="3">INHYPE PERFUME ATELIER</text>
  </svg>`;
}

for (const p of products) {
  fs.writeFileSync(path.join(perfumesDir, `${p.slug}-1.svg`), createBottleView1(p));
  fs.writeFileSync(path.join(perfumesDir, `${p.slug}-2.svg`), createBottleView2(p));
  fs.writeFileSync(path.join(perfumesDir, `${p.slug}-3.svg`), createBottleView3(p));
}

// Generate Hero Campaign Image
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1400" width="1200" height="1400">
  <defs>
    <radialGradient id="heroGlow" cx="52%" cy="45%" r="58%">
      <stop offset="0%" stop-color="#7E3E4A" stop-opacity="0.38"/>
      <stop offset="45%" stop-color="#2A2321" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#141312" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="amberLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF7A" stop-opacity="0.45"/>
      <stop offset="35%" stop-color="#7A3642" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#261216" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1F1D1B"/>
      <stop offset="30%" stop-color="#B7A58D"/>
      <stop offset="55%" stop-color="#EDE5D9"/>
      <stop offset="80%" stop-color="#8C7A62"/>
      <stop offset="100%" stop-color="#171615"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1400" fill="#141312"/>
  <rect width="1200" height="1400" fill="url(#heroGlow)"/>

  <!-- Warm Diagonal Sunbeam -->
  <polygon points="150,0 1200,180 1200,720 0,390" fill="#EDE5D9" opacity="0.035"/>
  <circle cx="620" cy="620" r="340" fill="#B7A58D" opacity="0.09"/>

  <!-- Sculptural Travertine Arch Backdrop -->
  <path d="M310,980 L310,430 A290,290 0 0,1 890,430 L890,980 Z" fill="#1F1C1A" stroke="#B7A58D" stroke-opacity="0.28" stroke-width="1.5"/>

  <!-- Stone Pedestal Block -->
  <polygon points="220,980 980,980 1080,1110 120,1110" fill="#2D2824" stroke="#B7A58D" stroke-opacity="0.3"/>
  <rect x="120" y="1110" width="960" height="290" fill="#1A1816"/>
  <ellipse cx="600" cy="1030" rx="220" ry="32" fill="#0B0A0A" opacity="0.8"/>

  <!-- Signature Atelier Flacon -->
  <g transform="translate(0, -10)">
    <!-- Cap -->
    <rect x="515" y="280" width="170" height="135" rx="4" fill="url(#goldCap)"/>
    <rect x="550" y="415" width="100" height="32" fill="#B7A58D"/>

    <!-- Heavy Cut-Glass Flacon -->
    <rect x="395" y="447" width="410" height="585" rx="24" fill="url(#amberLiquid)" stroke="#EDE5D9" stroke-opacity="0.55" stroke-width="2.5"/>
    <rect x="422" y="478" width="356" height="488" rx="14" fill="#52232C" opacity="0.65"/>

    <!-- Glass Highlights -->
    <rect x="415" y="470" width="20" height="530" rx="10" fill="#FFFFFF" opacity="0.2"/>
    <rect x="765" y="470" width="10" height="530" rx="5" fill="#B7A58D" opacity="0.25"/>

    <!-- Thick Glass Bottom -->
    <path d="M398,966 L802,966 L784,1028 L416,1028 Z" fill="#EDE5D9" opacity="0.2"/>

    <!-- Front Couture Label -->
    <rect x="455" y="575" width="290" height="295" fill="#EDE5D9" stroke="#B7A58D" stroke-width="2"/>
    <rect x="467" y="587" width="266" height="271" fill="none" stroke="#171615" stroke-opacity="0.25" stroke-width="1"/>

    <text x="600" y="635" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#632F39" letter-spacing="5">KAZAKHSTAN · ATELIER</text>
    <line x1="525" y1="655" x2="675" y2="655" stroke="#B7A58D" stroke-width="1.2"/>
    <text x="600" y="715" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="#171615" letter-spacing="6">INHYPE</text>
    <text x="600" y="748" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="16" fill="#632F39" letter-spacing="2">Perfume Atelier</text>
    <text x="600" y="815" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#5A534A" letter-spacing="4">EXTRAIT DE PARFUM</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(publicImagesDir, 'hero-campaign.svg'), heroSvg);

// Generate Discovery Editorial SVG
const discoverySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1000" width="900" height="1000">
  <rect width="900" height="1000" fill="#171615"/>
  <circle cx="450" cy="500" r="350" fill="#632F39" opacity="0.22"/>
  <!-- Architectural Concentric Olfactory Rings -->
  <circle cx="450" cy="480" r="280" fill="none" stroke="#B7A58D" stroke-opacity="0.3" stroke-width="1"/>
  <circle cx="450" cy="480" r="200" fill="none" stroke="#EDE5D9" stroke-opacity="0.2" stroke-dasharray="6 8"/>
  <!-- Fan of Scent Blotters -->
  <g transform="translate(450, 680)">
    <rect x="-18" y="-420" width="36" height="380" rx="2" transform="rotate(-24)" fill="#DFD4C4" stroke="#B7A58D"/>
    <rect x="-18" y="-440" width="36" height="390" rx="2" transform="rotate(-8)" fill="#EDE5D9" stroke="#B7A58D"/>
    <rect x="-18" y="-430" width="36" height="385" rx="2" transform="rotate(10)" fill="#F6F2EC" stroke="#B7A58D"/>
    <rect x="-18" y="-405" width="36" height="370" rx="2" transform="rotate(26)" fill="#DFD4C4" stroke="#B7A58D"/>
  </g>
  <text x="450" y="830" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#EDE5D9" letter-spacing="4">OLFACTORY PROFILING</text>
  <text x="450" y="862" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#B7A58D" letter-spacing="4">TOP · HEART · BASE ACCORD MATCHING</text>
</svg>`;

fs.writeFileSync(path.join(publicImagesDir, 'discovery-editorial.svg'), discoverySvg);

// Generate Boutique Astana & Aktobe Architectural Interior SVGs
function createBoutiqueSvg(city, subtitle, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="900" height="650">
    <rect width="900" height="650" fill="#171615"/>
    <rect x="40" y="40" width="820" height="570" fill="#1E1C1A" stroke="#B7A58D" stroke-opacity="0.3"/>
    <!-- Illuminated Niche Shelving Arches -->
    ${[0, 1, 2]
      .map((i) => {
        const x = 125 + i * 240;
        return `
        <g>
          <path d="M${x},460 L${x},180 A85,85 0 0,1 ${x + 170},180 L${x + 170},460 Z" fill="#2A2522" stroke="#B7A58D" stroke-opacity="0.4"/>
          <circle cx="${x + 85}" cy="220" r="70" fill="${accent}" opacity="0.18"/>
          <line x1="${x + 15}" y1="280" x2="${x + 155}" y2="280" stroke="#B7A58D" stroke-opacity="0.5" stroke-width="2"/>
          <line x1="${x + 15}" y1="370" x2="${x + 155}" y2="370" stroke="#B7A58D" stroke-opacity="0.5" stroke-width="2"/>
          <!-- Mini Flacons on Shelves -->
          <rect x="${x + 45}" y="242" width="22" height="36" fill="#EDE5D9" opacity="0.75"/>
          <rect x="${x + 80}" y="236" width="26" height="42" fill="#632F39" opacity="0.85"/>
          <rect x="${x + 118}" y="245" width="20" height="33" fill="#B7A58D" opacity="0.75"/>
          <rect x="${x + 55}" y="330" width="24" height="38" fill="#B7A58D" opacity="0.8"/>
          <rect x="${x + 95}" y="326" width="26" height="42" fill="#EDE5D9" opacity="0.75"/>
        </g>`;
      })
      .join('')}
    <!-- Travertine Consultation Table -->
    <rect x="200" y="485" width="500" height="75" fill="#EDE5D9" opacity="0.9"/>
    <text x="450" y="528" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#171615" letter-spacing="5">INHYPE ATELIER · ${city}</text>
    <text x="450" y="592" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#B7A58D" letter-spacing="3">${subtitle}</text>
  </svg>`;
}

fs.writeFileSync(
  path.join(publicImagesDir, 'boutique-astana.svg'),
  createBoutiqueSvg('ASTANA', 'ARCHITECTURAL CONCEPT PREVIEW · KAZAKHSTAN', '#B7A58D')
);
fs.writeFileSync(
  path.join(publicImagesDir, 'boutique-aktobe.svg'),
  createBoutiqueSvg('AKTOBE', 'OLFACTORY SPACE PREVIEW · KAZAKHSTAN', '#632F39')
);

console.log('Generated all editorial SVG assets in public/images/');
