import { Link } from 'react-router';
import { machines } from '../config/machines';
import { useMachineSelection } from '../model/use-machine-selection';
import { MachineCard } from './MachineCard';
import './JdmShowcase.scss';

export function JdmShowcase() {
  const { selectedMachine, getMachineLocation } = useMachineSelection();

  return (
    <section className="jdm-showcase" id="legends" aria-labelledby="jdm-title">
      <div className="jdm-showcase__container">
        <p className="jdm-showcase__section-label">
          <span className="jdm-showcase__section-number">02</span>
          <span><span lang="ja">伝説の車</span> — Icons</span>
          <span className="jdm-showcase__section-rule" aria-hidden="true" />
        </p>
        <div className="jdm-showcase__heading">
          <h2 className="jdm-showcase__title" id="jdm-title">JDM</h2>
          <p className="jdm-showcase__intro">Six machines. Six philosophies.<br />One mountain to conquer.</p>
        </div>
        <nav className="jdm-showcase__navigation" aria-label="Choose a JDM machine">
          {machines.map((machine) => {
            const selected = selectedMachine.id === machine.id;
            return (
              <Link
                key={machine.id}
                to={getMachineLocation(machine.id)}
                preventScrollReset
                className={`jdm-showcase__tab${selected ? ' jdm-showcase__tab--active' : ''}`}
                aria-current={selected ? 'true' : undefined}
                aria-controls="jdm-machine-panel"
              >
                <span className="jdm-showcase__tab-number">{machine.number}</span>
                <span>{machine.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="jdm-showcase__panel" id="jdm-machine-panel">
          <output className="jdm-showcase__announcement" aria-live="polite">
            Selected: {selectedMachine.name}, {selectedMachine.model}
          </output>
          <MachineCard machine={selectedMachine} />
        </div>
      </div>
    </section>
  );
}

