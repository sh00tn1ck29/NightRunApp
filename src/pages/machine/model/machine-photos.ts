import { machinePhotoCredits, type Machine } from '../../../entities/machine';
import frontImage from '../assets/ae86-front.jpg';
import rearImage from '../assets/ae86-rear.jpg';
import meetImage from '../assets/ae86-meet.jpg';
import rx7Front from '../assets/rx7-editorial-blue.jpg';
import rx7Rear from '../assets/rx7-editorial-white.jpg';
import rx7Original from '../../../entities/machine/assets/rx7.jpg';
import r34Front from '../assets/r34-editorial-front.jpg';
import r34Detail from '../assets/r34-detail.jpg';
import r34Rear from '../assets/r34-editorial-rear.jpg';
import a80Front from '../assets/a80-jdm-front.jpg';
import a80Rolling from '../assets/a80-jdm-rolling.jpg';
import a80Night from '../assets/a80-jdm-night.jpg';
import nsxFront from '../assets/nsx-front.jpg';
import nsxDetail from '../assets/nsx-detail.jpg';
import nsxMeet from '../assets/nsx-meet.jpg';
import ek9Side from '../assets/ek9-front.jpg';
import ek9Rear from '../assets/ek9-rear.jpg';
import ek9Sunset from '../assets/ek9-sunset.jpg';
export type GalleryPhoto = { src: string; alt: string; author: string; source: string; license: string; licenseUrl: string };
export function getMachinePhotos(machine: Machine): GalleryPhoto[] {
  const coverCredit = machinePhotoCredits[machine.id];
  const ae86Photos: GalleryPhoto[] = [
    { src: machine.image, alt: machine.imageAlt, author: coverCredit?.author ?? 'Unsplash', source: coverCredit?.source ?? machine.image, license: coverCredit?.license ?? 'Unsplash License', licenseUrl: coverCredit?.licenseUrl ?? 'https://unsplash.com/license' },
    { src: frontImage, alt: 'White Toyota Sprinter Trueno AE86 seen from the front', author: 'Tokumeigakarinoaoshima', source: 'https://commons.wikimedia.org/wiki/File:Toyota_SPRINTER_TRUENO_3door_(AE86)_front.JPG', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    { src: rearImage, alt: 'Rear view of a white Toyota Sprinter Trueno AE86', author: 'Tokumeigakarinoaoshima', source: 'https://commons.wikimedia.org/wiki/File:Toyota_SPRINTER_TRUENO_3door_(AE86)_rear.JPG', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    { src: meetImage, alt: 'Toyota Sprinter Trueno AE86 displayed at a car show', author: 'Charles', source: 'https://commons.wikimedia.org/wiki/File:Toyota_Sprinter_Trueno_(AE86,_1984)_(55213728871).jpg', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
  ];

  if (machine.id === 'ae86') return ae86Photos;
  const cover = ae86Photos[0];
  if (machine.id === 'ek9') return [cover,
    { src: ek9Side, alt: 'Yellow Civic Type R EK9 with Spoon graphics on a quiet road', author: 'Ben Lv', source: 'https://commons.wikimedia.org/wiki/File:Civic_Type_R_EK9-6.jpg', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    { src: ek9Rear, alt: 'Rear three-quarter view of a yellow Honda Civic Type R EK9', author: 'Tokumeigakarinoaoshima', source: 'https://commons.wikimedia.org/wiki/File:Honda_CIVIC_TYPE_R_(EK9)_rear_(2).JPG', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    { src: ek9Sunset, alt: 'Close-up of a yellow Civic EK9 headlight and front wheel at sunset', author: 'Jean Carlo Salas', source: 'https://www.pexels.com/photo/6143998/', license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' },
  ];
  if (machine.id === 'nsx') return [cover,
    { src: nsxFront, alt: 'Classic red Honda NSX photographed from the front at Silverstone', author: 'Jagjeet Dhuna', source: 'https://www.pexels.com/photo/31618532/', license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' },
    { src: nsxDetail, alt: 'Close-up of the pop-up headlight and Honda badge on a red NSX', author: 'Hugo Alonso', source: 'https://www.pexels.com/photo/17489918/', license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' },
    { src: nsxMeet, alt: 'Red first-generation NSX from the rear at a sunset car meet', author: 'Aden Heeremans', source: 'https://unsplash.com/photos/56kBwHfAlpE', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
  ];
  if (machine.id === 'a80') return [cover,
    { src: a80Rolling, alt: 'White modified Toyota Supra A80 rolling along a tree-lined road', author: 'Martynas Linge', source: 'https://www.pexels.com/photo/28569837/', license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' },
    { src: a80Night, alt: 'Toyota Supra A80 surrounded by photographers at a night car meet', author: 'Komorebi Photo', source: 'https://unsplash.com/photos/yZXYbCwAqSc', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
    { src: a80Front, alt: 'White Toyota Supra A80 photographed head-on against an urban backdrop', author: 'János Csatlós', source: 'https://www.pexels.com/photo/40062327/', license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/' },
  ];
  if (machine.id === 'r34') return [cover,
    { src: r34Front, alt: 'Blue Nissan Skyline GT-R R34 photographed from a low front angle', author: 'Andrew Akabane', source: 'https://unsplash.com/photos/3tbInEpu5OA', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
    { src: r34Detail, alt: 'Close-up of the round taillights and GT-R badge on a Bayside Blue R34 V-spec II', author: 'David Kernan', source: 'https://commons.wikimedia.org/wiki/File:Nissan_GTR_Skyline.jpg', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' },
    { src: r34Rear, alt: 'Blue Nissan Skyline R34 rear three-quarter view with a large rear wing', author: 'Sam Kusko', source: 'https://unsplash.com/photos/Jd1hd4TB81Y', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
  ];
  if (machine.id !== 'rx7') return [cover];
  return [cover,
    { src: rx7Front, alt: 'Low front view of a blue modified RX-7 FD under exhibition lighting', author: 'Sven Verweij', source: 'https://unsplash.com/photos/bg99MshN5j0', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
    { src: rx7Rear, alt: 'White Mazda RX-7 FD photographed from the rear on a wet street', author: 'Shoham Avisrur', source: 'https://unsplash.com/photos/P-qdhmGjf8c', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license' },
    { src: rx7Original, alt: 'Red Mazda RX-7 FD3S at a car event', author: 'Mr.choppers', source: 'https://commons.wikimedia.org/wiki/File:1994_Mazda_RX-7_R2_in_Vintage_Red,_front_left_(Lime_Rock).jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  ];
}
