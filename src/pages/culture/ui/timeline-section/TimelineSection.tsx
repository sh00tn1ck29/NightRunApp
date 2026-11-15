import './TimelineSection.scss';

const milestones = [
  {
    year: '1980s',
    title: 'The foundation',
    description: 'Affordable rear-wheel-drive coupes, turbocharging and a growing network of specialist workshops gave young drivers machines they could understand, repair and transform.',
  },
  {
    year: '1990',
    title: 'The golden era',
    description: 'Japan’s economic confidence produced the NSX, Skyline GT-R, RX-7 and Supra. A 280 PS agreement existed on paper; tuners quickly discovered the engineering underneath could support far more.',
  },
  {
    year: '1995',
    title: 'The mountain myth',
    description: 'Shuichi Shigeno’s Initial D manga began publishing, turning the techniques, rivalries and quiet obsession of tōge driving into a character-led national story.',
  },
  {
    year: '1998',
    title: 'Anime & Eurobeat',
    description: 'The television adaptation fused CG racing, hand-drawn drama and Eurobeat. Heel-and-toe, weight transfer and the underdog AE86 reached audiences far beyond Japan.',
  },
  {
    year: '2000s',
    title: 'Global signal',
    description: 'Magazines, VHS tapes, games and early internet forums carried Japanese tuning language worldwide. JDM evolved from a market designation into a global enthusiast identity.',
  },
];

export function TimelineSection() {
  return (
    <section className="culture-timeline" aria-labelledby="timeline-title">
      <div className="culture-timeline__container">
        <div className="culture-timeline__heading">
          <p className="culture-timeline__section-label">
            <span className="culture-timeline__section-number">02</span>
            <span><span lang="ja">年代</span> — Timeline</span>
            <span className="culture-timeline__section-rule" aria-hidden="true" />
          </p>
          <h2 className="culture-timeline__title" id="timeline-title">
            <span>The years that</span>
            <span className="culture-timeline__title-outline">Changed</span>
            <span className="culture-timeline__title-outline">Everything.</span>
          </h2>
        </div>

        <ol className="culture-timeline__list">
          {milestones.map((milestone, index) => (
            <li className="culture-timeline__item" key={milestone.year}>
              <span className="culture-timeline__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="culture-timeline__year">{milestone.year}</span>
              <h3 className="culture-timeline__event">{milestone.title}</h3>
              <p className="culture-timeline__description">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
