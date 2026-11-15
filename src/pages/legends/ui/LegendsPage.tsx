import { useRef } from 'react';
import { Header } from '../../../widgets/header';
import { useLegendsAnimations } from '../model/use-legends-animations';
import { MachineArchive } from '../../../widgets/machine-archive';
import { Footer } from '../../../widgets/footer';
import './LegendsPage.scss';

export function LegendsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useLegendsAnimations(pageRef);

  return (
    <div ref={pageRef} className="legends-page">
      <Header variant="archive" />
      <main>
        <section className="legends-page__hero" aria-labelledby="legends-title">
          <div className="legends-page__container">
            <p className="legends-page__eyebrow">TS–02 / Machine archive</p>
            <h1 className="legends-page__title" id="legends-title">
              <span>JDM</span>
              <span className="legends-page__title-outline">Legends</span>
            </h1>

            <div className="legends-page__summary">
              <p className="legends-page__description">
                Six machines that rewrote the rules. Explore the engineering, stories
                and spirit behind Japan’s golden era.
              </p>
              <p className="legends-page__meta">
                <span>1983–2002</span>
                <span>6 icons</span>
              </p>
            </div>
          </div>
          <span className="legends-page__watermark" lang="ja" aria-hidden="true">伝説</span>
        </section>
        <MachineArchive />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
