import './Headline.scss';

export function Headline() {
  return (
    <section className="headline" aria-labelledby="headline-title">
      <div className="headline__heading">
        <p className="headline__eyebrow">
          <span lang="ja">峠の精神</span>
          <span aria-hidden="true">/</span>
          Night runners archive
        </p>
        <h1 className="headline__title" id="headline-title">
          <span>TOUGE</span>
          <span className="headline__title-outline">SPIRIT</span>
        </h1>
      </div>

      <div className="headline__edition">
        <div className="headline__counter">
          <span>01</span>
          <span className="headline__counter-line" />
          <span>96</span>
        </div>
        <p className="headline__tagline">
          The spirit of
          <br />
          Japanese street racing
        </p>
        <div className="headline__stage">
          <span>
            <span lang="ja">藤原</span> / 86
            <br />
            Night stage
            <br />
            00:47:32
          </span>
          <span className="headline__cross" aria-hidden="true">
            +
          </span>
        </div>
      </div>

      <p className="headline__location">
        <span>Akina pass</span>
        <span lang="ja">標高 1,390m</span>
      </p>

      <div className="headline__scroll" aria-hidden="true">
        Scroll to drift
        <span className="headline__scroll-line" />
      </div>

      <section
        className="headline__telemetry"
        aria-label="Показатели автомобиля"
      >
        <span className="headline__telemetry-caption">Trueno / live data</span>
        <div className="headline__speed">
          <span className="headline__label">Speed</span>
          <div>
            <strong className="headline__value" data-speed>
              072
            </strong>{' '}
            <span className="headline__unit">km/h</span>
          </div>
        </div>
        <div className="headline__rpm">
          <span className="headline__rpm-bars" aria-hidden="true" />
          <div className="headline__dial">
            <strong>3.1</strong>
            <span className="headline__label">RPM × 1000</span>
          </div>
        </div>
        <div className="headline__gear">
          <span className="headline__label">Gear</span>
          <strong className="headline__value headline__value--accent">3</strong>
        </div>
        <p className="headline__sector">
          Sector 04 <span>−00.284</span>
        </p>
      </section>
    </section>
  );
}
