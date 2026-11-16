import { ResponsiveImage } from '../../../shared/ui/ResponsiveImage';
import { useRef } from 'react';
import { Link, useParams } from 'react-router';
import { machines, machinePhotoCredits } from '../../../entities/machine';
import { Header } from '../../../widgets/header';
import { Footer } from '../../../widgets/footer';
import { NotFoundPage } from '../../not-found';
import { machineDetails } from '../model/machine-details';
import { useMachineAnimations } from '../model/use-machine-animations';
import { MachineGallery } from './MachineGallery';
import { RelatedMachines } from './RelatedMachines';
import './MachinePage.scss';

export function MachinePage() {
  const { machineId } = useParams();
  const pageRef = useRef<HTMLDivElement>(null);
  useMachineAnimations(pageRef, machineId);
  const machine = machines.find(({ id }) => id === machineId);
  const details = machine && machineDetails[machine.id];
  if (!machine || !details) return <NotFoundPage />;
  const credit = machinePhotoCredits[machine.id];
  const specs = [['Power', machine.power], ['Engine', details.engine], ['Capacity', details.capacity], ['Layout', machine.layout], ['Weight', details.weight]];

  return <div ref={pageRef} className="machine-page">
    <Header variant="archive" />
    <main>
      <section className="machine-hero" aria-labelledby="machine-title">
        <ResponsiveImage className="machine-hero__image" src={machine.image} alt={machine.imageAlt} fetchPriority="high" />
        <Link className="machine-hero__back" to="/legends">← Back to Legends</Link>
        <span className="machine-hero__number" aria-hidden="true">{machine.number}</span>
        <div className="machine-hero__content">
          <p className="machine-hero__eyebrow">{machine.brand} / {machine.productionYears}<span lang="ja">{machine.japanese}</span></p>
          <h1 className="machine-hero__title" id="machine-title"><span>{machine.name}</span>{' '}<span className="machine-hero__model">{machine.archiveModel}</span></h1>
          <p className="machine-hero__introduction">{details.introduction}</p>
        </div>
        <aside className="machine-hero__badge" aria-label={`Chassis: ${details.chassis}`}>
          <span>Chassis</span><strong>{details.chassis}</strong><div className="machine-hero__meter" aria-hidden="true" /><span>Archive verified</span>
        </aside>
        {credit && <p className="machine-hero__credit">Photo: <a href={credit.source} target="_blank" rel="noreferrer">{credit.author}</a> · <a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a></p>}
      </section>
      <section className="machine-technical" aria-labelledby="technical-title">
        <div className="machine-page__container">
          <p className="machine-page__label"><span>01</span><span lang="ja">機械</span> — Technical data<i aria-hidden="true" /></p>
          <div className="machine-technical__heading"><h2 id="technical-title">Built for<span>The limit.</span></h2><p>Factory specification<br />{details.specification ?? 'Japanese-market reference'}</p></div>
          <dl className="machine-technical__specs">{specs.map(([label, value], index) => <div key={label}><dt>{String(index + 1).padStart(2, '0')} / {label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </section>
      <section className="machine-history" aria-labelledby="history-title">
        <div className="machine-history__year"><span>{machine.year}</span><small>Debut</small></div>
        <div className="machine-history__content">
          <p className="machine-page__label"><span>02</span><span lang="ja">物語</span> — History<i aria-hidden="true" /></p>
          <h2 id="history-title">A machine<br />becomes a<br />movement.</h2>
          <p className="machine-history__text">{details.history}</p><p className="machine-history__motto">{details.quote}</p>
          {details.sources && <p className="machine-history__sources">Sources: {details.sources.map((source, index) => <span key={source.url}>{index > 0 && ' · '}<a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></span>)}</p>}
        </div>
      </section>
      <MachineGallery key={machine.id} machine={machine} />
      <RelatedMachines currentId={machine.id} />
    </main>
    <Footer variant="compact" />
  </div>;
}
