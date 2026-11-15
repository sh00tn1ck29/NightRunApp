import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useCultureAnimations(sectionRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const headingElements = section.querySelectorAll<HTMLElement>(
        '.culture__section-label, .culture__title, .culture__intro',
      );

      gsap.from(headingElements, {
        autoAlpha: 0,
        y: 24,
        duration: 1,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      section.querySelectorAll<HTMLElement>('.culture__card').forEach((card) => {
        const elements = card.querySelectorAll<HTMLElement>(
          '.culture__image-wrap, .culture__card-number, .culture__copy, .culture__arrow',
        );

        gsap.from(elements, {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });
      });
    });

    return () => media.revert();
  }, { scope: sectionRef });
}
