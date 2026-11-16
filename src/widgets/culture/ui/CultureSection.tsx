import { ResponsiveImage } from '../../../shared/ui/ResponsiveImage';
import { useRef } from 'react';
import { useCultureAnimations } from '../model/use-culture-animations';
import driftPhoto from '../assets/drift.jpg';
import tuningPhoto from '../assets/tuning.jpg';
import enginePhoto from '../assets/engine.jpg';
import goldenPhoto from '../assets/golden.jpg';
import './CultureSection.scss';

const stories = [
  {
    id: 'drift',
    number: '01',
    title: 'The art of drift',
    description: 'Balance at the limit. A language spoken through countersteer, throttle and smoke.',
    japanese: 'ドリフト',
    image: driftPhoto,
    alt: 'Light trails tracing a mountain hairpin above the city at night',
  },
  {
    id: 'tuning',
    number: '02',
    title: 'Built, not bought',
    description: 'Every machine tells the story of its driver—one part, one late night at a time.',
    japanese: 'チューニング',
    image: tuningPhoto,
    alt: 'A modified Mustang on a narrow forest road',
  },
  {
    id: 'engine',
    number: '03',
    title: 'Heart of the machine',
    description: 'High-revving fours, sequential turbos and the unmistakable pulse of a rotary.',
    japanese: 'エンジン',
    image: enginePhoto,
    alt: 'Two friends beside a white car on a mountain road after dark',
  },
  {
    id: 'golden',
    number: '04',
    title: 'Japan, 1990–99',
    description: 'A golden decade when engineering ambition escaped onto the mountain roads.',
    japanese: '黄金時代',
    image: goldenPhoto,
    alt: 'A sports car on a winding mountain road in golden sunset light',
  },
];

export function CultureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useCultureAnimations(sectionRef);

  return (
    <section ref={sectionRef} className="culture" id="culture" aria-labelledby="culture-title">
      <div className="culture__container">
        <p className="culture__section-label">
          <span className="culture__section-number">03</span>
          <span><span lang="ja">文化</span> — The culture</span>
          <span className="culture__section-rule" aria-hidden="true" />
        </p>

        <div className="culture__heading">
          <h2 className="culture__title" id="culture-title">Racing</h2>
          <p className="culture__intro">More than speed.<br />A discipline. A community.</p>
        </div>

        <div className="culture__grid">
          {stories.map((story) => (
            <article className={`culture__card culture__card--${story.id}`} key={story.id} aria-labelledby={`culture-${story.id}`}>
              <div className="culture__image-wrap">
                <ResponsiveImage className="culture__image" src={story.image} alt={story.alt} loading="lazy" decoding="async" />
                <span className="culture__japanese" lang="ja" aria-hidden="true">{story.japanese}</span>
              </div>
              <div className="culture__card-body">
                <span className="culture__card-number" aria-hidden="true">{story.number}</span>
                <div className="culture__copy">
                  <h3 className="culture__card-title" id={`culture-${story.id}`}>{story.title}</h3>
                  <p className="culture__description">{story.description}</p>
                </div>
                <span className="culture__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
