import { useRef } from 'react';
import { Link } from 'react-router';
import { machinePhotoCredits } from '../../../entities/machine';
import { useArchiveAnimations } from '../model/use-archive-animations';
import { machineFilters, useMachineFilter } from '../model/use-machine-filter';
import './MachineArchive.scss';

export function MachineArchive() {
  const { selectedBrand, setSelectedBrand, searchQuery, setSearchQuery, filteredMachines, resetFilters } = useMachineFilter();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const resultsKey = `${selectedBrand}:${filteredMachines.map((machine) => machine.id).join(',')}`;
  useArchiveAnimations(sectionRef, gridRef, resultsKey);

  return (
    <section ref={sectionRef} className="machine-archive" aria-label="Machine archive">
      <div className="machine-archive__container">
        <div className="machine-archive__toolbar">
          <fieldset className="machine-archive__filters" aria-label="Марка автомобиля">
            {machineFilters.map((filter, index) => (
              <button
                className={`machine-archive__filter${selectedBrand === filter ? ' machine-archive__filter--active' : ''}`}
                type="button"
                key={filter}
                aria-pressed={selectedBrand === filter}
                onClick={() => setSelectedBrand(filter)}
              >
                <span className="machine-archive__filter-number">{String(index).padStart(2, '0')}</span>
                {filter}
              </button>
            ))}
          </fieldset>
          <div className="machine-archive__search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input
              type="search"
              placeholder="Search the archive"
              aria-label="Поиск машины по названию"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
            />
            <span className="machine-archive__count" aria-live="polite" aria-atomic="true">{String(filteredMachines.length).padStart(2, '0')} {filteredMachines.length === 1 ? 'machine' : 'machines'}</span>
          </div>
        </div>

        <div ref={gridRef} className="machine-archive__grid">
          {filteredMachines.length === 0 && (
            <div className="machine-archive__empty">
              <p className="machine-archive__empty-label">No signal / 404</p>
              <h2 className="machine-archive__empty-title">No machines found.</h2>
              <button className="machine-archive__reset" type="button" onClick={resetFilters}>
                Reset archive
              </button>
            </div>
          )}
          {filteredMachines.map((machine) => {
            const credit = machinePhotoCredits[machine.id];
            return (
              <article className="machine-archive__card" key={machine.id} aria-labelledby={`archive-${machine.id}`}>
                <div className="machine-archive__image-wrap">
                  <img className="machine-archive__image" src={machine.image} alt={machine.imageAlt} loading="lazy" decoding="async" />
                  <span className="machine-archive__japanese" lang="ja" aria-hidden="true">{machine.japanese}</span>
                  <span className="machine-archive__number" aria-hidden="true">{machine.number}</span>
                </div>
                <div className="machine-archive__details">
                  <div className="machine-archive__identity">
                    <p className="machine-archive__brand">{machine.brand}</p>
                    <h2 className="machine-archive__name" id={`archive-${machine.id}`}>
                      <Link className="machine-archive__card-link" to={`/legends/${machine.id}`}>{machine.name}</Link>
                    </h2>
                    <p className="machine-archive__model">{machine.archiveModel}</p>
                  </div>
                  <dl className="machine-archive__specs">
                    <div><dt>Year</dt><dd>{machine.productionYears}</dd></div>
                    <div><dt>Power</dt><dd>{machine.power}</dd></div>
                    <div><dt>Drive</dt><dd>{machine.layout}</dd></div>
                  </dl>
                </div>
                {credit && (
                  <p className="machine-archive__credit">
                    Photo: <a href={credit.source} target="_blank" rel="noreferrer">{credit.author}</a>
                    {' · '}<a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
