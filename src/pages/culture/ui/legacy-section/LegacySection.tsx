import { Link } from 'react-router';
import './LegacySection.scss';

export function LegacySection() {
  return (
    <section className="culture-legacy" aria-labelledby="legacy-title">
      <div className="culture-legacy__container">
        <span className="culture-legacy__decoration" aria-hidden="true">86</span>

        <div className="culture-legacy__content">
          <p className="culture-legacy__section-label">
            <span>05</span>
            <span><span lang="ja">遺産</span> — Legacy</span>
            <span className="culture-legacy__section-rule" aria-hidden="true" />
          </p>
          <h2 className="culture-legacy__title" id="legacy-title">
            <span>The road left</span>
            <span>Japan.</span>
          </h2>
          <p className="culture-legacy__description">
            Today, JDM culture belongs to a worldwide community—but its strongest work
            still respects the original values: understand the platform, improve with
            purpose and let the machine carry a personal signature. The cars survived
            because the knowledge did.
          </p>
          <p className="culture-legacy__note">
            TOUGE SPIRIT celebrates the history and craft of Japanese performance culture.
            Drive responsibly and keep competition on closed roads and circuits.
          </p>
          <Link className="culture-legacy__link" to="/legends">
            Explore the machines <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
