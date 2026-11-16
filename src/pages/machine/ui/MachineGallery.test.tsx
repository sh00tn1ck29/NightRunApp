// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MachineGallery } from './MachineGallery';
import { machines } from '../../../entities/machine';
import { getMachinePhotos } from '../model/machine-photos';
import { relatedMachines } from '../model/related-machines';

class PendingImage {
  static requests: PendingImage[] = [];
  src = '';
  onload: (() => Promise<void>) | null = null;
  onerror: (() => void) | null = null;
  decode = vi.fn().mockResolvedValue(undefined);
  constructor() { PendingImage.requests.push(this); }
}
beforeEach(() => {
  PendingImage.requests = [];
  vi.stubGlobal('Image', PendingImage);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const buttons = () => screen.getAllByRole('button', { name: /^Photo / });
const stage = () => document.querySelector<HTMLImageElement>('.machine-gallery__image')!;

describe('archive gallery', () => {
  it('keeps the current photograph until the next one has decoded', async () => {
    render(<MachineGallery machine={machines[0]} />);
    const original = stage().getAttribute('src');
    fireEvent.click(buttons()[1]);
    expect(stage().getAttribute('src')).toBe(original);
    expect(screen.getByRole('status').textContent).toContain('Loading');
    await act(async () => { await PendingImage.requests[0].onload?.(); });
    expect(stage().getAttribute('src')).toBe(getMachinePhotos(machines[0])[1].src);
    expect(buttons()[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('ignores an older selection that finishes after a newer selection', async () => {
    render(<MachineGallery machine={machines[0]} />);
    fireEvent.click(buttons()[1]);
    const late = PendingImage.requests[0].onload;
    fireEvent.click(buttons()[2]);
    await act(async () => { await PendingImage.requests[1].onload?.(); await late?.(); });
    expect(stage().getAttribute('src')).toBe(getMachinePhotos(machines[0])[2].src);
  });

  it('preserves the photograph on failure and supports retry', async () => {
    render(<MachineGallery machine={machines[0]} />);
    const original = stage().getAttribute('src');
    fireEvent.click(buttons()[1]);
    act(() => PendingImage.requests[0].onerror?.());
    expect(screen.getByRole('alert').textContent).toContain('Unable to load');
    expect(stage().getAttribute('src')).toBe(original);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await act(async () => { await PendingImage.requests[1].onload?.(); });
    expect(buttons()[1].getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('ignores a completed request after unmount', async () => {
    const { unmount } = render(<MachineGallery machine={machines[0]} />);
    fireEvent.click(buttons()[1]);
    const late = PendingImage.requests[0].onload;
    unmount();
    await act(async () => { await late?.(); });
    expect(PendingImage.requests[0].onload).toBeNull();
  });

  it('remounts the initial photograph when retrying its failed load', async () => {
    render(<MachineGallery machine={machines[0]} />);
    const failed = stage();
    fireEvent.error(failed);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await act(async () => { await PendingImage.requests[0].onload?.(); });
    expect(stage()).not.toBe(failed);
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

it('recommends every machine somewhere without duplicates or self links', () => {
  const recommended = new Set<string>();
  for (const machine of machines) {
    const ids = relatedMachines(machine.id).map(item => item.id);
    expect(ids).toHaveLength(3);
    expect(new Set(ids).size).toBe(3);
    expect(ids).not.toContain(machine.id);
    ids.forEach(id => recommended.add(id));
  }
  expect(recommended.size).toBe(machines.length);
});
