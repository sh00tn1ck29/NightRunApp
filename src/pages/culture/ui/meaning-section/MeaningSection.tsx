import './MeaningSection.scss';

export function MeaningSection() {
  return (
    <section className="meaning" aria-labelledby="meaning-title">
      <div className="meaning__container">
        <p className="meaning__section-label">
          <span className="meaning__section-number">01</span>
          <span><span lang="ja">起源</span> — The meaning</span>
          <span className="meaning__section-rule" aria-hidden="true" />
        </p>

        <div className="meaning__layout">
          <h2 className="meaning__title" id="meaning-title">
            <span>More than</span>
            <span className="meaning__title-outline">A market.</span>
          </h2>

          <div className="meaning__content">
            <p className="meaning__lead">
              JDM literally means <strong>Japanese Domestic Market</strong>:
              vehicles and parts created for sale inside Japan.
            </p>
            <p className="meaning__description">
              Outside Japan, the phrase grew into something larger. It came to describe a
              design philosophy built around compact dimensions, mechanical clarity,
              high-revving engines and intense specialisation. The culture was never one
              uniform scene—circuit racers, drifters, highway tuners, stance builders and
              restoration purists all spoke different dialects of the same language.
            </p>

            <ul className="meaning__terms" aria-label="Термины автомобильной культуры">
              <li><span lang="ja">走り屋</span> / Hashiriya</li>
              <li><span lang="ja">峠</span> / Touge</li>
              <li><span lang="ja">改造</span> / Kaizō</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
