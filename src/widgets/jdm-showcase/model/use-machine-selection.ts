import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { defaultMachineId, machines } from '../config/machines';
import type { MachineId } from '../config/machines';

export function useMachineSelection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const requestedId = searchParams.get('car');
  const selectedMachine = machines.find((machine) => machine.id === requestedId)
    ?? machines.find((machine) => machine.id === defaultMachineId)!;
  const invalidSelection = requestedId !== null && requestedId !== selectedMachine.id;

  useEffect(() => {
    if (!invalidSelection) return;

    const next = new URLSearchParams(searchParams);
    next.set('car', defaultMachineId);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }, [invalidSelection, searchParams, setSearchParams]);

  const getMachineLocation = (id: MachineId) => {
    const next = new URLSearchParams(searchParams);
    next.set('car', id);
    return {
      pathname: location.pathname,
      search: `?${next.toString()}`,
      hash: location.hash,
    };
  };

  return { selectedMachine, getMachineLocation };
}
