import { useEffect, useRef } from 'react';

type Opt = {
  enabled?: boolean;
  onIntersect: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export const useIntersection = ({
  enabled = true,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: Opt) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { root, rootMargin, threshold },
    );

    io.observe(el);
    return () => io.unobserve(el);
  }, [enabled, onIntersect, root, rootMargin, threshold]);

  return ref;
};
