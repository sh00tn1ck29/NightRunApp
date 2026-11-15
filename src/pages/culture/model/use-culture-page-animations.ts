import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useCulturePageAnimations(pageRef: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.header__inner > *', {
        autoAlpha: 0, y: -16, duration: 0.8, stagger: 0.1, ease: 'power2.out',
      });
      gsap.from('.culture-page__eyebrow, .culture-page__title > span, .culture-page__summary, .culture-page__edition', {
        autoAlpha: 0, y: 24, duration: 1, stagger: 0.12, delay: 0.2, ease: 'power2.out',
      });
      const elements = pageRef.current?.querySelectorAll<HTMLElement>(
        '.meaning__section-label, .meaning__title > span, .meaning__lead, .meaning__description, .meaning__terms, .culture-timeline__section-label, .culture-timeline__title > span, .initial-d__section-label, .initial-d__eyebrow, .initial-d__title > span, .initial-d__text, .initial-d__quote, .culture-scenes__section-label, .culture-scenes__title > span',
      );
      elements?.forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0, y: 24, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      const timelineRows = pageRef.current?.querySelectorAll<HTMLElement>('.culture-timeline__item');
      timelineRows?.forEach((row) => {
        // Animate the contents so the row's CSS hover transform stays independent.
        gsap.from(row.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
      });

      const initialVisual = pageRef.current?.querySelector('.initial-d__visual');
      if (initialVisual) {
        gsap.from(initialVisual, {
          autoAlpha: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: initialVisual, start: 'top 88%', once: true },
        });
      }

      const sceneCards = pageRef.current?.querySelectorAll<HTMLElement>('.culture-scenes__card');
      sceneCards?.forEach((card) => {
        gsap.from(card.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
      });

      const legacy = pageRef.current?.querySelector('.culture-legacy');
      if (legacy) {
        gsap.from(legacy.querySelectorAll('.culture-legacy__content > *'), {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: legacy, start: 'top 75%', once: true },
        });
      }
    });
    return () => media.revert();
  }, { scope: pageRef });
}
