import type { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function useLegendsAnimations(pageRef: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.header__inner > *', {
        autoAlpha: 0, y: -16, duration: 0.8, stagger: 0.1, ease: 'power2.out',
      });
      gsap.from('.legends-page__eyebrow, .legends-page__title > span, .legends-page__summary', {
        autoAlpha: 0, y: 24, duration: 1, stagger: 0.12, delay: 0.2, ease: 'power2.out',
      });
    });
    return () => media.revert();
  }, { scope: pageRef });
}
