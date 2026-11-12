import { Header } from '../../../widgets/header';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Headline } from '../../../widgets/headline';
import './HomePage.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const intro = introRef.current;
      const header = headerRef.current;
      const video = videoRef.current;
      const speedElement = intro.querySelector<HTMLElement>('[data-speed]');

      if (!intro || !header || !video || !contextSafe) return;

      const createAnimation = contextSafe(() => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) {
          return;
        }

        video.pause();
        video.currentTime = 0;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: 'top top',
            end: '+=1000',
            scrub: 0.4,
            pin: true,
          },
        });

        timeline.to(header, {
          yPercent: -100,
          autoAlpha: 0,
          ease: 'none',
          duration: 1,
        });

        timeline.to(video, {
          currentTime: Math.max(0, video.duration - 0.001),
          ease: 'none',
          duration: 11,
        });

        if (speedElement) {
          timeline.fromTo(
            speedElement,
            { textContent: 72 },
            {
              textContent: 140,
              duration: 11,
              ease: 'none',
              modifiers: {
                textContent: (value) =>
                  String(Math.round(Number(value))).padStart(3, '0'),
              },
            },
            '<',
          );
        }

        ScrollTrigger.refresh();
      });

      if (video.readyState >= 1) {
        createAnimation();
      } else {
        video.addEventListener('loadedmetadata', createAnimation, {
          once: true,
        });
      }

      return () => {
        video.removeEventListener('loadedmetadata', createAnimation);
      };
    },
    { scope: introRef },
  );

  return (
    <div className="home-page">
      <div className="home-page__intro" ref={introRef}>
        <video
          ref={videoRef}
          className="home-page__background"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src={`${import.meta.env.BASE_URL}videos/touge.mp4`}
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
    </div>
  );
}
