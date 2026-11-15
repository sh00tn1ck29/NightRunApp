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

      if (!intro || !header || !video || !contextSafe) return;

      const speedElement = intro.querySelector<HTMLElement>('[data-speed]');
      const rpmElement = intro.querySelector<HTMLElement>('[data-rpm]');
      const speedBars = intro.querySelectorAll<HTMLElement>('[data-speed-bar]');
      const rpmNeedle = intro.querySelector<HTMLElement>('[data-rpm-needle]');
      const driftDuration = 11;
      const entrance = gsap.matchMedia();

      entrance.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.header__inner > *', {
          autoAlpha: 0,
          y: -16,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        });

        gsap.from('.headline > *', {
          autoAlpha: 0,
          y: '+=24',
          duration: 1,
          stagger: 0.12,
          delay: 0.2,
          ease: 'power2.out',
        });
      });

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

        // Every telemetry tween shares the video's start and duration.
        timeline.addLabel('drift');

        timeline.to(video, {
          currentTime: Math.max(0, video.duration - 0.001),
          ease: 'none',
          duration: driftDuration,
        }, 'drift');

        if (speedElement) {
          timeline.fromTo(
            speedElement,
            { textContent: 72 },
            {
              textContent: 140,
              duration: driftDuration,
              ease: 'none',
              modifiers: {
                textContent: (value) =>
                  String(Math.round(Number(value))).padStart(3, '0'),
              },
            },
            'drift',
          );
        }

        if (rpmElement) {
          timeline.fromTo(
            rpmElement,
            { textContent: 3.1 },
            {
              textContent: 8.6,
              duration: driftDuration,
              ease: 'none',
              modifiers: {
                textContent: (value) =>
                  String(Number(value).toFixed(1)).padStart(3, '0'),
              },
            },
            'drift',
          );
        }

        if (speedBars.length > 0) {
          timeline.fromTo(
            speedBars,
            { scaleY: 0.1 },
            {
              scaleY: (index) => 0.25 + index * 0.1,
              transformOrigin: 'center bottom',
              duration: driftDuration,
              ease: 'none',
            },
            'drift',
          );
        }

        if (rpmNeedle) {
          timeline.fromTo(
            rpmNeedle,
            { rotation: -65 },
            {
              rotation: 65,
              transformOrigin: 'center bottom',
              duration: driftDuration,
              ease: 'none',
            },
            'drift',
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
        entrance.revert();
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

