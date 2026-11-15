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
        '.meaning__section-label, .meaning__title > span, .meaning__lead, .meaning__description, .meaning__terms',
      );
      elements?.forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0, y: 24, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: pageRef });
}
