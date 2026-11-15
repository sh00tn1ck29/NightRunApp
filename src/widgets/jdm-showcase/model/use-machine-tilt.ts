import type { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { MachineId } from '../../../entities/machine';

gsap.registerPlugin(useGSAP);

type MachineTiltOptions = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  cardRef: RefObject<HTMLElement | null>;
  machineId: MachineId;
};

export function useMachineTilt({ wrapperRef, cardRef, machineId }: MachineTiltOptions) {
  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const media = gsap.matchMedia();
    media.add(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const maxTilt = 6;
        gsap.set(card, { transformOrigin: '50% 50%', rotationX: 0, rotationY: 0 });
        const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          const bounds = wrapper.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;

          const x = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1);
          const y = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1);
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

        return () => {
          wrapper.removeEventListener('pointermove', onMove);
          wrapper.removeEventListener('pointerleave', reset);
          wrapper.removeEventListener('pointercancel', reset);
          window.removeEventListener('blur', reset);
        };
      },
    );

    return () => media.revert();
  }, {
    scope: wrapperRef,
    dependencies: [machineId],
    revertOnUpdate: true,
  });
}

