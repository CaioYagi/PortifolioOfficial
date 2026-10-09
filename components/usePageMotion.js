import { useEffect } from 'react';

export default function usePageMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = root.querySelectorAll('[data-reveal]');
    let observer;

    if (!reducedMotion && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.visible = 'true';
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });
      targets.forEach((target) => observer.observe(target));
      root.dataset.motion = 'ready';
    }

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      root.style.setProperty('--page-progress', progress);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rootRef]);
}
