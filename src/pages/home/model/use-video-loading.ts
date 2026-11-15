import { useEffect, useState, type RefObject } from 'react';

export function useVideoLoading(videoRef: RefObject<HTMLVideoElement | null>) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeout: ReturnType<typeof setTimeout>;
    const ready = () => {
      clearTimeout(timeout);
      setStatus('ready');
    };
    const fail = () => {
      clearTimeout(timeout);
      setStatus('error');
    };

    video.addEventListener('loadeddata', ready);
    video.addEventListener('canplay', ready);
    video.addEventListener('error', fail);
    timeout = setTimeout(fail, 15000);
    if (video.readyState >= 2) ready();
    if (attempt > 0) video.load();

    return () => {
      clearTimeout(timeout);
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
