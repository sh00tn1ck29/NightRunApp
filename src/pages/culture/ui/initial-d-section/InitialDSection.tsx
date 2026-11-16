import { ResponsiveImage } from '../../../../shared/ui/ResponsiveImage';
import roadPhoto from '../../assets/initial-d-anime.jpg';
import './InitialDSection.scss';

export function InitialDSection() {
  return (
    <section className="initial-d" aria-labelledby="initial-d-title">
      <figure className="initial-d__visual">
        <ResponsiveImage className="initial-d__image" src={roadPhoto} alt="Toyota AE86 drifting on a mountain road in Initial D Legend 1" loading="lazy" decoding="async" />
        <span className="initial-d__year" aria-hidden="true">1995</span>
        <figcaption className="initial-d__location"><span lang="ja">群馬県</span> / Gunma</figcaption>
      </figure>

      <div className="initial-d__content">
        <p className="initial-d__section-label">
          <span className="initial-d__section-number">03</span>
          <span><span lang="ja">頭文字D</span> — The cult</span>
          <span className="initial-d__section-rule" aria-hidden="true" />
        </p>
        <p className="initial-d__eyebrow">From mountain folklore to a global gateway.</p>
        <h2 className="initial-d__title" id="initial-d-title">
          <span>Why Initial D</span>
          <span>Mattered.</span>
        </h2>

        <div className="initial-d__text">
          <p>
            Initial D did not invent tōge driving, drifting or the AE86. Its achievement
            was making a technical, local subculture emotionally legible. A delivery car
            became an underdog hero; tyre management, racing lines and weight transfer
            became part of the drama.
          </p>
          <p>
            The manga began in 1995 and the television anime followed in 1998. Its
            combination of grounded driving detail, rival teams and Eurobeat created a
            distinct rhythm that games, videos and enthusiast communities carried around
            the world.
          </p>
          <p>
            The result was lasting: the AE86 gained near-mythic status, Gunma became part
            of the global enthusiast imagination, and a generation learned that speed
            could be a story about discipline—not only horsepower.
          </p>
        </div>

        <p className="initial-d__quote">
          The ordinary car became extraordinary because the driver understood every movement.
        </p>
      </div>
    </section>
  );
}
