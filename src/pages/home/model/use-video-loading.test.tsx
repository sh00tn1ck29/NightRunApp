// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { useVideoLoading } from './use-video-loading';

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it('shows the static hero immediately when reduced motion is requested', () => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
  const video = document.createElement('video');
  const listen = vi.spyOn(video, 'addEventListener');
  const { result } = renderHook(() => useVideoLoading({ current: video }));
  expect(result.current.status).toBe('ready');
  expect(listen).not.toHaveBeenCalled();
});

it('falls back after a loading timeout and removes its listeners', () => {
  vi.useFakeTimers();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  const video = document.createElement('video');
  const remove = vi.spyOn(video, 'removeEventListener');
  const { result, unmount } = renderHook(() => useVideoLoading({ current: video }));
  expect(result.current.status).toBe('loading');
  act(() => vi.advanceTimersByTime(15000));
  expect(result.current.status).toBe('error');
  unmount();
  expect(remove).toHaveBeenCalledWith('loadeddata', expect.any(Function));
  expect(vi.getTimerCount()).toBe(0);
});

it('dismisses the loader on metadata without requiring a frame or scroll', () => {
  vi.useFakeTimers();
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  const video = document.createElement('video');
  const videoRef = { current: video };
  const { result } = renderHook(() => useVideoLoading(videoRef));
  act(() => video.dispatchEvent(new Event('loadedmetadata')));
  expect(result.current.status).toBe('ready');
  expect(vi.getTimerCount()).toBe(0);
  act(() => vi.advanceTimersByTime(15000));
  expect(result.current.status).toBe('ready');
});

it('dismisses the loader when metadata was cached before mounting', () => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  const video = document.createElement('video');
  Object.defineProperty(video, 'readyState', { value: 1 });
  const { result } = renderHook(() => useVideoLoading({ current: video }));
  expect(result.current.status).toBe('ready');
});
