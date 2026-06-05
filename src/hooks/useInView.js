import { useEffect, useRef, useState } from 'react';

/**
 * useInView — Intersection Observer hook.
 * Returns [ref, isVisible].
 * Once the element scrolls into view it stays visible (one-shot).
 */
export default function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);

  return [ref, visible];
}
