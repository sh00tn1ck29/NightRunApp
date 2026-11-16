// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AppRouter } from './index';
import { machines } from '../../../entities/machine';

// Layout animation is verified separately from route content and focus behavior.
vi.mock('@gsap/react', () => ({ useGSAP: vi.fn() }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn());
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it.each(['/', '/legends', '/culture', ...machines.map(machine => `/legends/${machine.id}`)])(
  '%s exposes one main landmark, page heading and a top level banner', pathname => {
    window.history.replaceState({}, '', pathname);
    render(<AppRouter />);
    const main = screen.getByRole('main');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(main.contains(screen.getByRole('banner'))).toBe(false);
    expect(document.activeElement).toBe(main);
    expect(screen.getByRole('link', { name: 'Skip to main content' }).getAttribute('href')).toBe(`#${main.id}`);
    expect(document.title).toContain('Touge Spirit');
  },
);

it('updates title and focus when following a related machine link', () => {
  window.history.replaceState({}, '', '/legends/ae86');
  render(<AppRouter />);
  fireEvent.click(screen.getByRole('link', { name: 'Explore Mazda RX-7' }));
  expect(window.location.pathname).toBe('/legends/rx7');
  expect(document.title).toBe('Mazda RX-7 FD3S | Touge Spirit');
  expect(document.activeElement).toBe(screen.getByRole('main'));
});

it('renders a useful fallback for an unknown machine', () => {
  window.history.replaceState({}, '', '/legends/unknown');
  render(<AppRouter />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('404');
  expect(document.title).toBe('Page not found | Touge Spirit');
});
