import { useState } from 'react';
import { machines, type Machine } from '../../../entities/machine';

type MachineFilter = 'All' | Machine['brand'];

export const machineFilters: readonly MachineFilter[] = ['All', 'Toyota', 'Mazda', 'Nissan', 'Honda'];

export function useMachineFilter() {
  const [selectedBrand, setSelectedBrand] = useState<MachineFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const normalize = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const query = normalize(searchQuery);
  const filteredMachines = machines.filter((machine) => {
    const matchesBrand = selectedBrand === 'All' || machine.brand === selectedBrand;
    const name = normalize(`${machine.brand} ${machine.name} ${machine.model} ${machine.archiveModel}`);
    return matchesBrand && name.includes(query);
  });

  const resetFilters = () => {
    setSelectedBrand('All');
    setSearchQuery('');
  };

  return { selectedBrand, setSelectedBrand, searchQuery, setSearchQuery, filteredMachines, resetFilters };
}
