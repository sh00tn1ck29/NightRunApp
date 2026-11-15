import { useRef } from 'react';
import { Header } from '../../../widgets/header';
import { useCulturePageAnimations } from '../model/use-culture-page-animations';
import background from '../assets/culture-night.jpg';
import { MeaningSection } from './meaning-section/MeaningSection';
import { TimelineSection } from './timeline-section/TimelineSection';
import { InitialDSection } from './initial-d-section/InitialDSection';
import { ScenesSection } from './scenes-section/ScenesSection';
import './CulturePage.scss';

export function CulturePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useCulturePageAnimations(pageRef);

  return (
    <div className="culture-page" ref={pageRef}>
      <main>
      <div className="culture-page__intro">
        <img className="culture-page__background" src={background} alt="" aria-hidden="true" fetchPriority="high" />
        <Header variant="archive" />
        <section className="culture-page__hero" aria-label="JDM Culture">
          <div className="culture-page__edition" aria-label="03 — The culture behind the cars">
            <span className="culture-page__number" aria-hidden="true">03</span>
            <span>The culture<br />Behind the cars</span>
          </div>

          <div className="culture-page__heading">
            <p className="culture-page__eyebrow">TS–03 / <span lang="ja">文化</span> archive / 1980–2000</p>
            <h1 className="culture-page__title">
              <span>JDM</span>
              <span className="culture-page__title-outline">Culture</span>
            </h1>
          </div>

          <div className="culture-page__summary">
            <span className="culture-page__japanese" lang="ja">日本国内専用車</span>
            <p className="culture-page__description">
              Born from engineering ambition, local roads and the belief that a
              machine should reflect its driver.
            </p>
          </div>
        </section>
      </div>
      <MeaningSection />
      <TimelineSection />
      <InitialDSection />
      <ScenesSection />
      </main>
    </div>
  );
}
