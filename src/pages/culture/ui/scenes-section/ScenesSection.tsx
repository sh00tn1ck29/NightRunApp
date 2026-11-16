import { ResponsiveImage } from '../../../../shared/ui/ResponsiveImage';
import tougePhoto from '../../assets/scene-touge.jpg';
import expresswayPhoto from '../../assets/scene-expressway.jpg';
import tuningPhoto from '../../assets/scene-tuning.jpg';
import { machines, machinePhotoCredits } from '../../../../entities/machine';

const mediaMachine = machines.find((machine) => machine.id === 'r34')!;
const mediaCredit = machinePhotoCredits.r34!;
import './ScenesSection.scss';

const scenes = [
  { id: 'touge', number: '01', title: 'Touge', eyebrow: 'Mountain discipline', japanese: '峠', image: tougePhoto, alt: 'J’s Racing S2000 followed by a Mazda RX-7 during a real Hot-Version touge battle at Gunsai', description: 'Narrow passes rewarded rhythm rather than raw power. Drivers learned braking points, weight transfer and the value of a lightweight chassis.', credit: 'Hot-Version Vol.140 / Gunsai', source: 'https://www.hot-version.jp/hotversion/140/' },
  { id: 'expressway', number: '02', title: 'Expressway', eyebrow: 'Midnight velocity', japanese: '首都高', image: expresswayPhoto, alt: 'Black taxi beneath neon karaoke signs in Tokyo at night', description: 'Tokyo and Osaka expressways shaped a different technical language: stability, cooling, gearing and high-speed confidence under sodium lights.', credit: 'Jon Tang / Unsplash', source: 'https://unsplash.com/photos/FIvA_ImhRsM' },
  { id: 'tuning', number: '03', title: 'Tuning', eyebrow: 'Built through iteration', japanese: '改造', image: tuningPhoto, alt: 'Modified black Nissan Skyline with purple underglow at a Tokyo street meet', description: 'Workshops became laboratories. Suspension, boost, aero and engine response were refined one late night and one test run at a time.', credit: 'Kevin Woblick / Unsplash', source: 'https://unsplash.com/photos/k055eAqGh3k' },
  { id: 'media', number: '04', title: 'Media', eyebrow: 'The culture recorded', japanese: '記録', image: mediaMachine.image, alt: mediaMachine.imageAlt, description: 'Option, Best Motoring, tuning catalogues and games documented the scene, turning local knowledge into an international visual language.', credit: mediaCredit.author, source: mediaCredit.source },
];

export function ScenesSection() {
  return (
    <section className="culture-scenes" aria-labelledby="scenes-title">
      <div className="culture-scenes__container">
        <div className="culture-scenes__heading">
          <p className="culture-scenes__section-label">
            <span className="culture-scenes__section-number">04</span>
            <span><span lang="ja">場所</span> — The scenes</span>
            <span className="culture-scenes__section-rule" aria-hidden="true" />
          </p>
          <h2 className="culture-scenes__title" id="scenes-title"><span>Four sides of the</span><span>Signal.</span></h2>
        </div>

        <div className="culture-scenes__grid">
          {scenes.map((scene) => (
            <article className={`culture-scenes__card culture-scenes__card--${scene.id}`} key={scene.id} aria-labelledby={`scene-${scene.id}`}>
              <div className="culture-scenes__image-wrap">
                <ResponsiveImage className="culture-scenes__image" src={scene.image} alt={scene.alt} loading="lazy" decoding="async" />
                <span className="culture-scenes__japanese" lang="ja" aria-hidden="true">{scene.japanese}</span>
              </div>
              <div className="culture-scenes__body">
                <span className="culture-scenes__number" aria-hidden="true">{scene.number}</span>
                <div>
                  <p className="culture-scenes__eyebrow">{scene.eyebrow}</p>
                  <h3 className="culture-scenes__name" id={`scene-${scene.id}`}>{scene.title}</h3>
                  <p className="culture-scenes__description">{scene.description}</p>
                  <a className="culture-scenes__credit" href={scene.source} target="_blank" rel="noreferrer">{scene.credit}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
