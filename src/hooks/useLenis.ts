import { useEffect, useRef } from 'react';
import Lenis, { type LenisOptions } from '@studio-freight/lenis';

export const useLenis = (opts?: Partial<LenisOptions>) => {
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      ...opts,
    });
    ref.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return ref;
};
