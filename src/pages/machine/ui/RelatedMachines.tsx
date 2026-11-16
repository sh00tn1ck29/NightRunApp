import { ResponsiveImage } from '../../../shared/ui/ResponsiveImage';
import { Link } from 'react-router';
import { type MachineId } from '../../../entities/machine';
import { relatedMachines } from '../model/related-machines';
import './RelatedMachines.scss';

export function RelatedMachines({ currentId }: { currentId: MachineId }) {
  const related = relatedMachines(currentId);
  const titles: Partial<Record<MachineId, string>> = { r34: 'Skyline GT-R', a80: 'Supra' };

  return <section className="related-machines" aria-labelledby="related-title">
    <div className="machine-page__container">
      <div className="related-machines__heading">
        <p className="machine-page__label"><span>04</span><span lang="ja">次の走り</span> — Next run<i aria-hidden="true" /></p>
        <h2 id="related-title">Related legends</h2>
      </div>
      <div className="related-machines__grid">
        {related.map((machine) => <Link
          key={machine.id}
          className="related-machines__card"
          to={`/legends/${machine.id}`}
          aria-label={`Explore ${machine.brand} ${titles[machine.id] ?? machine.name}`}
        >
          <ResponsiveImage className="related-machines__image" src={machine.image} sizes="(max-width: 767px) 90vw, 28vw" alt={machine.imageAlt} loading="lazy" decoding="async" />
          <span className="related-machines__japanese" lang="ja" aria-hidden="true">{machine.japanese}</span>
          <div className="related-machines__details">
            <p>{machine.brand}</p>
            <h3>{titles[machine.id] ?? machine.name}</h3>
          </div>
          <span className="related-machines__arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </div>
  </section>;
}
