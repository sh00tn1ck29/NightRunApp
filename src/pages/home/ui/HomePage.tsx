import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.hero-title', {
        y: 150,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">TOUGE SPIRIT</h1>
    </div>
  );
}
