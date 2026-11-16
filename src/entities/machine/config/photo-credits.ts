import type { MachineId } from './machines';

type PhotoCredit = { author: string; source: string; license: string; licenseUrl: string };

export const machinePhotoCredits: Partial<Record<MachineId, PhotoCredit>> = {
  ae86: {
    author: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1530627453036-ea8a6d6e37db',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  rx7: {
    author: 'Loris Boulinguez',
    source: 'https://unsplash.com/photos/bJwEWrRLyhY',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  r34: {
    author: 'Timmie Ahl',
    source: 'https://unsplash.com/photos/a-white-sports-car-parked-on-a-wet-road-ZNPVwTqhhHo',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  a80: {
    author: 'Chris Demers / Unsplash',
    source: 'https://i.blogs.es/571416/chris-demers-03tmul_a3vm-unsplash/1024_2000.jpeg',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  nsx: {
    author: 'Thierry Biland',
    source: 'https://unsplash.com/photos/qmW1jW_6-Cc',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
  ek9: {
    author: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1711226876715-53a1882660e9',
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  },
};
