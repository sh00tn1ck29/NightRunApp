import { useEffect, useState, type RefObject } from 'react';

export function useVideoLoading(videoRef: RefObject<HTMLVideoElement | null>) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'ready' : 'loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    let timeout: ReturnType<typeof setTimeout>;
    const ready = () => {
      clearTimeout(timeout);
      setStatus('ready');
    };
    const fail = () => {
      clearTimeout(timeout);
      setStatus('error');
    };

    // The poster can display the hero while the first video frame buffers.
    // Do not wait for a seek/scroll to make a paused video emit loadeddata.
    video.addEventListener('loadedmetadata', ready);
    video.addEventListener('loadeddata', ready);
    video.addEventListener('canplay', ready);
    video.addEventListener('error', fail);
    timeout = setTimeout(fail, 15000);
    if (video.readyState >= 1) ready();
    if (attempt > 0) video.load();

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('loadedmetadata', ready);
      video.removeEventListener('loadeddata', ready);
      video.removeEventListener('canplay', ready);
      video.removeEventListener('error', fail);
    };
  }, [videoRef, attempt]);

  const retry = () => {
    setStatus('loading');
    setAttempt((value) => value + 1);
  };

  return { status, retry };
}
