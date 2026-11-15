import ae86Image from '../assets/ae86.jpg';
import rx7Image from '../assets/rx7.jpg';
import r34Image from '../assets/r34.jpg';
import a80Image from '../assets/a80.jpg';
import nsxImage from '../assets/nsx.jpg';
import ek9Image from '../assets/ek9.jpg';

export type MachineId = 'ae86' | 'rx7' | 'r34' | 'a80' | 'nsx' | 'ek9';

export type Machine = {
  id: MachineId;
  number: string;
  name: string;
  model: string;
  brand: 'Toyota' | 'Mazda' | 'Nissan' | 'Honda';
  productionYears: string;
  archiveModel: string;
  power: string;
  layout: string;
  year: string;
  japanese: string;
  image: string;
  imageAlt: string;
};

export const machines: readonly Machine[] = [
  { id: 'ae86', brand: 'Toyota', productionYears: '1983–1987', archiveModel: 'Sprinter Trueno GT-Apex', number: '01', name: 'AE86', model: 'Toyota Trueno', power: '128 PS', layout: 'FR', year: '1983', japanese: 'ハチロク', image: ae86Image, imageAlt: 'White Toyota AE86 in a wet car park at night' },
  { id: 'rx7', brand: 'Mazda', productionYears: '1992–2002', archiveModel: 'FD3S', number: '02', name: 'RX-7', model: 'Mazda FD3S', power: '280 PS', layout: 'FR', year: '1992', japanese: 'ロータリー', image: rx7Image, imageAlt: 'Red Mazda RX-7 FD3S' },
  { id: 'r34', brand: 'Nissan', productionYears: '1999–2002', archiveModel: 'Skyline GT-R', number: '03', name: 'R34', model: 'Skyline GT-R', power: '280 PS', layout: 'AWD', year: '1999', japanese: 'ゴジラ', image: r34Image, imageAlt: 'White Nissan Skyline R34 reflected in a puddle' },
  { id: 'a80', brand: 'Toyota', productionYears: '1993–2002', archiveModel: 'Supra MK4', number: '04', name: 'A80', model: 'Supra MK4', power: '280 PS', layout: 'FR', year: '1993', japanese: 'スープラ', image: a80Image, imageAlt: 'Blue Toyota Supra A80 with a black hood at a car meet' },
  { id: 'nsx', brand: 'Honda', productionYears: '1992–1995', archiveModel: 'NSX-R', number: '05', name: 'NSX', model: 'Honda NSX-R', power: '280 PS', layout: 'MR', year: '1992', japanese: '精密機械', image: nsxImage, imageAlt: 'Black first-generation Honda NSX parked on grass' },
  { id: 'ek9', brand: 'Honda', productionYears: '1997–2000', archiveModel: 'Civic Type R', number: '06', name: 'EK9', model: 'Civic Type R', power: '185 PS', layout: 'FF', year: '1997', japanese: 'タイプR', image: ek9Image, imageAlt: 'Black Honda Civic hatchback under a cloudy sky' },
];

export const defaultMachineId: MachineId = 'ae86';

