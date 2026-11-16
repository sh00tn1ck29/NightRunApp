import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useMachineAnimations(pageRef: RefObject<HTMLDivElement | null>, machineId?: string) {
  useGSAP(() => {
    const page = pageRef.current;
    if (!page) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });
      hero.from('.machine-hero__image', { opacity: 0, scale: 1.04, duration: 1.6 })
        .from('.header__inner > *, .machine-hero__back', { opacity: 0, y: -12, stagger: .08 }, .1)
        .from('.machine-hero__eyebrow, .machine-hero__title > span, .machine-hero__introduction', { opacity: 0, y: 28, stagger: .12 }, .25)
        .from('.machine-hero__number, .machine-hero__badge, .machine-hero__credit', { opacity: 0, y: 16, stagger: .1 }, .65);

      const reveals: Array<{ elements: NodeListOf<Element>; tween: gsap.core.Tween }> = [];
      const showFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest('.machine-hero, .header')) hero.progress(1);
        reveals.forEach(({ elements, tween }) => {
          if ([...elements].some(element => element.contains(event.target as Node))) tween.progress(1);
        });
      };
      page.addEventListener('focusin', showFocused);
      const reveal = (selector: string, stagger = 0) => {
        const elements = page.querySelectorAll(selector);
        if (!elements.length) return;
        const tween = gsap.from(elements, {
          opacity: 0, y: 24, duration: .9, stagger, ease: 'power3.out',
          scrollTrigger: { trigger: elements[0], start: 'top 90%', once: true },
        });
        reveals.push({ elements, tween });
      };

      reveal('.machine-technical .machine-page__label, .machine-technical__heading', .12);
      reveal('.machine-technical__specs > div', .09);
      reveal('.machine-history__year > span, .machine-history__year > small', .12);
      reveal('.machine-history__content .machine-page__label, .machine-history__content h2, .machine-history__text, .machine-history .machine-history__motto', .12);
      reveal('.machine-gallery .machine-page__label, .machine-gallery__heading', .12);
      reveal('.machine-gallery__stage');
      reveal('.machine-gallery__thumbnail', .08);
      reveal('.machine-gallery__credit');
      reveal('.related-machines__heading');
      reveal('.related-machines__card', .12);
      return () => page.removeEventListener('focusin', showFocused);
    });

    return () => media.revert();
  }, { scope: pageRef, dependencies: [machineId], revertOnUpdate: true });
}
