import { JdmShowcase } from '../../../widgets/jdm-showcase';
import { CultureSection } from '../../../widgets/culture';
import { Footer } from '../../../widgets/footer';
import { Header } from '../../../widgets/header';
import { useRef } from 'react';
import { Headline } from '../../../widgets/headline';
import { useHomeAnimations } from '../model/use-home-animations';
import { useVideoLoading } from '../model/use-video-loading';
import { OriginSection } from './origin-section/OriginSection';
import './HomePage.scss';

export function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status: videoStatus } = useVideoLoading(videoRef);

  useHomeAnimations({ introRef, headerRef, videoRef });

  return (
    <div className="home-page">
      <div className="home-page__header" ref={headerRef}><Header /></div>
      <main>
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
        <div className={`home-page__loader${videoStatus !== 'loading' ? ' home-page__loader--ready' : ''}`} aria-hidden={videoStatus !== 'loading'}>
          <div className="home-page__loader-content">
            <p className="home-page__loader-code">TS–01 / Night stage</p>
            <div className="home-page__loader-brand" aria-hidden="true">
              <span className="home-page__loader-mark">TS</span>
              <span>Touge<br />Spirit</span>
            </div>
            <p className="home-page__loader-title">The night<br /><span>is calling.</span></p>
            <div className={`home-page__loader-track${videoStatus === 'error' ? ' home-page__loader-track--error' : ''}`} aria-hidden="true"><span /></div>
            <output className="home-page__loader-status">
              {videoStatus === 'error' ? 'Signal lost. Try loading again.' : videoStatus === 'ready' ? 'Ready to drift.' : 'Preparing the night run'}
            </output>
          </div>
          <span className="home-page__loader-caption" aria-hidden="true">峠の精神 / Born in the mountains.</span>
        </div>
        <div className="home-page__hero-content" inert={videoStatus === 'loading'}>
          <Headline />
        </div>
      </div>
      <OriginSection />
      <JdmShowcase />
      <CultureSection />
      </main>
      <Footer />
    </div>
  );
}





