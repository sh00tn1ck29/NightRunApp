import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useArchiveAnimations(
  sectionRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLDivElement | null>,
  resultsKey: string,
) {
  useGSAP(() => {
    const section = sectionRef.current;
    const toolbar = section?.querySelector('.machine-archive__toolbar');
    if (!toolbar) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(toolbar, {
        autoAlpha: 0, y: 24, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 90%', once: true },
      });
    });
    return () => media.revert();
  }, { scope: sectionRef });

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.machine-archive__card');
    if (!cards) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      cards.forEach((card, index) => {
        gsap.from(card, {
          autoAlpha: 0, y: 24, duration: 0.9, delay: (index % 2) * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: gridRef, dependencies: [resultsKey], revertOnUpdate: true });
}
