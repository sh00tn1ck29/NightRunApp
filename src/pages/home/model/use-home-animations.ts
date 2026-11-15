import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HomeAnimationRefs = {
  introRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
};

export function useHomeAnimations({
  introRef,
  headerRef,
  videoRef,
}: HomeAnimationRefs) {
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
      const scrollLine = intro.querySelector<HTMLElement>(
        '.headline__scroll-line',
      );
      const origin = intro
        .closest('.home-page')
        ?.querySelector<HTMLElement>('.origin');
      const driftDuration = 11;
      const entrance = gsap.matchMedia();

      entrance.add('(prefers-reduced-motion: no-preference)', () => {
        const photoCleanups: Array<() => void> = [];
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

        if (origin) {
          // Select text only: neither photo nor its figure is transformed.
          const revealElements = origin.querySelectorAll<HTMLElement>(
            [
              '.origin__section-label',
              '.origin__eyebrow',
              '.origin__title > span',
              '.origin__lead',
              '.origin__description',
              '.origin__coordinates',
              '.origin__landscape figcaption',
              '.origin__margin-note',
              '.origin__ribbon-track',
            ].join(', '),
          );

          revealElements.forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: '+=24',
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true,
              },
            });
          });

          const photos = origin.querySelectorAll<HTMLImageElement>(
            '.origin__landscape img, .origin__night-photo img',
          );

          photos.forEach((photo) => {
            // Create the tween now for matchMedia cleanup, but wait until both
            // the scroll position and the lazy-loaded image are ready to play.
            const reveal = gsap.fromTo(
              photo,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.4,
                ease: 'power3.inOut',
                paused: true,
              },
            );
            let entered = false;
            const revealWhenReady = () => {
              if (entered && photo.complete && photo.naturalWidth > 0) {
                reveal.play();
              }
            };

            photo.addEventListener('load', revealWhenReady);
            photoCleanups.push(() => {
              photo.removeEventListener('load', revealWhenReady);
            });

            ScrollTrigger.create({
              // Measure the unmasked figure, not the clipped image.
              trigger: photo.closest('figure') ?? photo,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                entered = true;
                revealWhenReady();
              },
            });
          });
        }

        return () => {
          photoCleanups.forEach((cleanup) => cleanup());
        };
      });

      entrance.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          if (!origin) return;

          const cleanups: Array<() => void> = [];
          const photoWrappers =
            origin.querySelectorAll<HTMLElement>('[data-origin-tilt]');
          const maxTilt = 6;

          photoWrappers.forEach((wrapper) => {
            const photo = wrapper.querySelector('img');
            if (!photo) return;

            // Measure the stationary wrapper; rotate only its image.
            gsap.set(photo, {
              transformOrigin: '50% 50%',
              rotationX: 0,
              rotationY: 0,
            });
            const rotateX = gsap.quickTo(photo, 'rotationX', {
              duration: 0.5,
              ease: 'power3.out',
            });
            const rotateY = gsap.quickTo(photo, 'rotationY', {
              duration: 0.5,
              ease: 'power3.out',
            });

            const onMove = (event: PointerEvent) => {
              if (event.pointerType !== 'mouse') return;
              const bounds = wrapper.getBoundingClientRect();
              if (!bounds.width || !bounds.height) return;

              const x = gsap.utils.clamp(
                -1,
                1,
                ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
              );
              const y = gsap.utils.clamp(
                -1,
                1,
                ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
              );
              rotateX(-y * maxTilt);
              rotateY(x * maxTilt);
            };
            const reset = () => {
              rotateX(0);
              rotateY(0);
            };

            wrapper.addEventListener('pointermove', onMove);
            wrapper.addEventListener('pointerleave', reset);
            wrapper.addEventListener('pointercancel', reset);
            window.addEventListener('blur', reset);
            cleanups.push(() => {
              wrapper.removeEventListener('pointermove', onMove);
              wrapper.removeEventListener('pointerleave', reset);
              wrapper.removeEventListener('pointercancel', reset);
              window.removeEventListener('blur', reset);
            });
          });

          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
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
            scrub: 0.8,
            pin: true,

            refreshPriority: 1,
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

        timeline.to(
          video,
          {
            currentTime: Math.max(0, video.duration - 0.001),
            ease: 'none',
            duration: driftDuration,
          },
          'drift',
        );

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
        if (scrollLine) {
          // Start at timeline position 0 and cover the complete pinned intro.
          timeline.fromTo(
            scrollLine,
            { '--scroll-progress': '0%' },
            {
              '--scroll-progress': '100%',
              duration: timeline.duration(),
              ease: 'none',
            },
            0,
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
}
