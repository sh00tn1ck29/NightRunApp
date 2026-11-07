import './App.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
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

export default App;
