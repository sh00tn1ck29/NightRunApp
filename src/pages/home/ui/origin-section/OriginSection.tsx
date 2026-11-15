import landscape from '../../assets/origin-landscape.jpg';
import nightDrive from '../../assets/origin-night.jpg';
import './OriginSection.scss';

export function OriginSection() {
  return (
    <section className="origin" aria-labelledby="origin-title">
      <div className="origin__container">
        <p className="origin__section-label">
          <span className="origin__section-number">01</span>
          <span><span lang="ja">起源</span> — Origin</span>
          <span className="origin__section-rule" aria-hidden="true" />
        </p>

        <div className="origin__composition">
          <div className="origin__heading">
            <p className="origin__eyebrow">It began after midnight.</p>
            <h2 className="origin__title" id="origin-title">
              <span>The legend</span>
              <span className="origin__title-outline">begins</span>
            </h2>
          </div>

          <div className="origin__story">
            <p className="origin__lead">
              Long before circuits and crowds, the mountain belonged to those
              who chased the perfect line.
            </p>
            <p className="origin__description">
              Japan’s narrow passes became a proving ground—where mechanical
              intuition met courage, and ordinary cars became legends.
            </p>
            <p className="origin__coordinates">
              <span><span lang="ja">榛名山</span> / Haruna</span>
              <span>36° 28′ 37″ N</span>
            </p>
          </div>

          <figure className="origin__landscape">
            <div className="origin__photo-tilt" data-origin-tilt>
              <img
                src={landscape}
                alt="Forested mountain ridges disappearing into low clouds in Japan"
                width="1600"
                height="1000"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption>Night run / Gunma, 1996</figcaption>
          </figure>

          <figure className="origin__night-photo">
            <div className="origin__photo-tilt" data-origin-tilt>
              <img
                src={nightDrive}
                alt="Red car taillights glowing on a dark road"
                width="480"
                height="640"
                loading="eager"
                decoding="async"
              />
            </div>
          </figure>

          <p className="origin__margin-note" aria-hidden="true">
            Pass / attack / repeat
          </p>
        </div>
      </div>

      <div className="origin__ribbon" aria-hidden="true">
        <div className="origin__ribbon-track">
          {Array.from({ length: 3 }, (_, index) => (
            <span className="origin__ribbon-group" key={index}>
              <span>Instinct</span><i />
              <span>Grip</span><i />
              <span>Control</span><i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}



