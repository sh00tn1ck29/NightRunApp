import type { MachineId } from '../../../entities/machine';

type MachineDetails = {
  chassis: string;
  introduction: string;
  engine: string;
  capacity: string;
  weight: string;
  history: string;
  quote: string;
  specification?: string;
  sources?: { title: string; url: string }[];
};

export const machineDetails: Partial<Record<MachineId, MachineDetails>> = {
  ek9: {
    chassis: 'EK9',
    introduction: 'A high-revving B16B, a close-ratio manual and a lightweight hatchback body. The first Civic Type R turned everyday proportions into an unmistakably focused driving machine.',
    engine: 'B16B inline-four VTEC', capacity: '1,595 CC', weight: '1,070 KG',
    specification: '1997 JDM / power steering, ABS & SRS',
    history: 'The first Civic Type R arrived in 1997, bringing Honda’s performance philosophy to the compact three-door Civic. Its naturally aspirated 1.6-litre B16B produced 185 PS at 8,200 rpm, paired with a close-ratio five-speed manual gearbox and a helical limited-slip differential. A strengthened body and dedicated suspension tuning sharpened its response, while red Recaro seats and a MOMO steering wheel kept the driver central to the experience. The EK9 established the formula that would define generations of Civic Type R: revs, precision and a direct connection to the road.',
    quote: 'Every rev has a purpose.',
    sources: [
      { title: 'Honda — 1997 Civic Type R specifications', url: 'https://www.honda.co.jp/factbook/auto/CIVIC/19970822/cv97-013.html' },
      { title: 'Honda — B16B engine development', url: 'https://www.honda.co.jp/factbook/auto/CIVIC/19970822/cv97-006.html' },
    ],
  },
  nsx: {
    chassis: 'NA1',
    introduction: 'An aluminium body, a naturally aspirated VTEC V6 and a mid-engine balance. The first Type R distilled Honda’s supercar into a sharper, lighter driving experience.',
    engine: 'C30A V6 VTEC', capacity: '2,977 CC', weight: '1,230 KG',
    specification: '1992 NSX Type R / Japanese market',
    history: 'Honda introduced the NSX Type R in November 1992, refining its aluminium-bodied mid-engine sports car around driver involvement. Removing sound insulation and selected comfort equipment helped save 120 kg, while lightweight Recaro seats, an Enkei wheel package and a MOMO steering wheel reinforced its focus. The 280 PS C30A VTEC V6 received more precise balancing, paired with a five-speed manual and a shorter final drive. Dedicated suspension tuning followed extensive circuit testing, including the Nürburgring. Championship White paint and a red Honda badge recalled Honda’s first Formula One victory.',
    quote: 'Less weight. More connection.',
    sources: [
      { title: 'Honda — 1992 NSX Type R launch', url: 'https://global.honda/jp/news/1992/4921126.html' },
      { title: 'Honda — C30A engine technology', url: 'https://global.honda/en/tech/engine/car/C30A_NSX_vtec_DOHC/' },
    ],
  },
  a80: {
    chassis: 'JZA80',
    introduction: 'A twin-turbo straight-six, a purposeful rear-wheel-drive chassis and an unmistakable silhouette. Toyota’s grand tourer evolved into a defining Japanese sports car.',
    engine: '2JZ-GTE inline-six', capacity: '2,997 CC', weight: '1,490 KG',
    specification: '1993 Supra RZ / Japanese market',
    history: 'Introduced in May 1993, the A80 Supra combined a shorter wheelbase and wider track with a rounded 2+2 coupe body. The Japanese-market RZ paired a 280 PS twin-turbo 2JZ-GTE straight-six with a six-speed Getrag manual gearbox. Double-wishbone suspension at all four wheels supported its move toward outright sports-car performance. The A80 also competed at Le Mans and in Japan’s GT500 class. Production ended in August 2002, while the Supra continued its racing career beyond the end of its road-going model.',
    quote: 'A straight-six heart. A lasting impression.',
    sources: [
      { title: 'Toyota — A80 history and RZ specifications', url: 'https://www.toyota-global.com/company/history_of_toyota/75years/vehicle_lineage/car/id60006850/index.html' },
    ],
  },
  r34: {
    chassis: 'BNR34',
    introduction: 'Twin-turbo straight-six power and all-wheel-drive precision. The final Skyline GT-R brought a generation of Japanese performance engineering into sharp focus.',
    engine: 'RB26DETT inline-six', capacity: '2,568 CC', weight: '1,560 KG',
    specification: '2000 GT-R V-spec II / Japanese market',
    history: 'The Skyline GT-R BNR34 arrived in January 1999, following the R34 Skyline introduced the previous year. Its RB26DETT twin-turbo straight-six and all-wheel-drive chassis continued the GT-R formula, while a multifunction display gave the driver a new view into the car’s performance. The V-spec models added dedicated aerodynamics, suspension tuning and an active limited-slip differential. Introduced in 2000, the V-spec II gained a carbon-fibre bonnet with a NACA duct. The final Skyline-badged GT-R remained in production until 2002.',
    quote: 'Precision in every input. Purpose in every corner.',
    sources: [
      { title: 'Nissan Heritage — GT-R V-spec II specifications', url: 'https://www.nissan-global.com/EN/HERITAGE_COLLECTION/280_skyline_gt-r_v-spec_ii.html' },
      { title: 'Nissan — Skyline to GT-R history', url: 'https://www.nissanusa.com/experience-nissan/news-and-events/evolution-from-skyline-to-gt-r.html' },
    ],
  },
  rx7: {
    chassis: 'FD3S',
    introduction: 'A compact twin-rotor engine, sequential twin turbos and a body shaped around driving. Mazda’s uncompromising vision of the pure sports car.',
    engine: '13B-REW twin-rotor', capacity: '654 CC × 2', weight: '1,250 KG',
    specification: '1991 Japanese launch specification',
    history: 'Launched in Japan in December 1991 as the Anfini RX-7, the FD brought Mazda’s rotary sports car back to its essentials. The compact 13B-REW used sequential twin turbochargers, producing 255 PS at launch. Mazda’s Plan Zero programme cut weight throughout the car, while double-wishbone suspension served its focus on handling. Later revisions raised output to 280 PS. Production ended in 2002, closing the final chapter of the RX-7.',
    quote: 'Two rotors. One uncompromising pursuit of driving.',
    sources: [
      { title: 'Mazda — RX-7 development history', url: 'https://www2.mazda.com/en/stories/craftmanship/greatcar/p15.html' },
      { title: 'Mazda — Rotary engine vehicle archive', url: 'https://filecache.mediaroom.com/mr5mr_mazdaca/210703/download/Mazda_Rotary%20Press_Information%202017.pdf' },
    ],
  },
  ae86: {
    chassis: 'Sprinter',
    introduction: 'Lightweight, communicative and endlessly adjustable—the humble Corolla that became the definitive mountain-road machine.',
    engine: '4A-GE inline-four', capacity: '1,587 CC', weight: '940 KG',
    history: 'Introduced in 1983, the final rear-wheel-drive Corolla paired a high-revving twin-cam engine with a chassis that rewarded precision. Its modest power made momentum, balance and driver commitment the center of the experience. Grassroots drift competition, one-make racing and late-night touge culture transformed the AE86 from affordable transport into a global icon. Its reputation was built by drivers, not marketing departments.',
    quote: 'Engineering earns the numbers. Drivers create the legend.',
  },
};
