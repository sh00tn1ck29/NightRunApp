import { machines, type MachineId } from '../../../entities/machine';

export function relatedMachines(currentId: MachineId) {
  const start = machines.findIndex(machine => machine.id === currentId);
  return Array.from({ length: Math.min(3, machines.length - 1) }, (_, offset) =>
    machines[(start + offset + 1) % machines.length]);
}
