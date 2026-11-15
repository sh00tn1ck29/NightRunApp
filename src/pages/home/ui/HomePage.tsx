import { JdmShowcase } from '../../../widgets/jdm-showcase';
import { CultureSection } from '../../../widgets/culture';
import { Footer } from '../../../widgets/footer';
import { Header } from '../../../widgets/header';
import { useRef } from 'react';
import { Headline } from '../../../widgets/headline';
import { useHomeAnimations } from '../model/use-home-animations';
import { OriginSection } from './origin-section/OriginSection';
import './HomePage.scss';

export function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useHomeAnimations({ introRef, headerRef, videoRef });

  return (
    <div className="home-page">
      <div className="home-page__intro" ref={introRef}>
        <video
          ref={videoRef}
          className="home-page__background"
          muted
          playsInline
          preload="auto"
          poster={`${import.meta.env.BASE_URL}videos/touge-poster.jpg`}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src={`${import.meta.env.BASE_URL}videos/touge-scroll.mp4#t=0.001`}
            type="video/mp4"
          />
        </video>
        <div className="home-page__header" ref={headerRef}>
          <Header />
        </div>
        <main>
          <Headline />
        </main>
      </div>
      <OriginSection />
      <JdmShowcase />
      <CultureSection />
      <Footer />
    </div>
  );
}





