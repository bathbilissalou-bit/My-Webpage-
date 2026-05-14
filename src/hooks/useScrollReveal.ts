import { useEffect, useRef } from "react";

const BASE_OPTS: IntersectionObserverInit = {
  threshold: 0.08,
  rootMargin: "0px 0px -48px 0px",
};

/** Adds "in-view" to the returned element when it enters the viewport. */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  opts?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("in-view");
        observer.unobserve(el);
      }
    }, { ...BASE_OPTS, ...opts });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Watches the returned container; when it enters the viewport, adds "in-view"
 * to every child that has the class "reveal", staggered by `stepMs` ms each.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  stepMs = 110,
  opts?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const items = el.querySelectorAll<HTMLElement>(".reveal");
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add("in-view"), i * stepMs);
        });
        observer.unobserve(el);
      }
    }, { ...BASE_OPTS, ...opts });
    observer.observe(el);
    return () => observer.disconnect();
  }, [stepMs]);

  return ref;
}
