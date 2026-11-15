import { useRef } from 'react';
import { useMachineTilt } from '../model/use-machine-tilt';
import { machinePhotoCredits, type Machine } from '../../../entities/machine';

type MachineCardProps = { machine: Machine };

export function MachineCard({ machine }: MachineCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  useMachineTilt({ wrapperRef, cardRef, machineId: machine.id });

  const credit = machinePhotoCredits[machine.id];
  return (
    <div className="jdm-showcase__card-tilt" ref={wrapperRef}>
      <article className="jdm-showcase__card" aria-labelledby="jdm-machine-name" ref={cardRef}>
        <div className="jdm-showcase__image-wrap">
          <img
            className={`jdm-showcase__image${machine.id === 'ae86' ? ' jdm-showcase__image--monochrome' : ''}`}
            src={machine.image}
            alt={machine.imageAlt}
            width="1600"
            height="1000"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="jdm-showcase__card-number" aria-hidden="true">{machine.number}</span>
        <div className="jdm-showcase__card-content">
          <p className="jdm-showcase__eyebrow">Mountain weapon / {machine.year}</p>
          <h3 className="jdm-showcase__machine-name" id="jdm-machine-name">{machine.name}</h3>
          <p className="jdm-showcase__model">{machine.model}</p>
          <dl className="jdm-showcase__specs">
            <div><dt>Power</dt><dd>{machine.power}</dd></div>
            <div><dt>Layout</dt><dd>{machine.layout}</dd></div>
            <div><dt>Era</dt><dd>{machine.year}</dd></div>
          </dl>
          <button className="jdm-showcase__view" type="button" disabled>
            View machine <span aria-hidden="true">→</span>
          </button>
        </div>
        <span className="jdm-showcase__japanese" lang="ja" aria-hidden="true">{machine.japanese}</span>
        {credit && (
          <p className="jdm-showcase__photo-credit">
            Photo: <a href={credit.source} target="_blank" rel="noreferrer">{credit.author}</a>
            {' · '}<a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a>
            {' · cropped'}
          </p>
        )}
      </article>
    </div>
  );
}



