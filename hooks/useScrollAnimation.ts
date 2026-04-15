"use client";

import { useEffect, useRef } from "react";
import { loadAnime } from "@/lib/anime";

type AnimatableElement = HTMLElement | null;

/**
 * Triggers an anime.js stagger animation when the element enters the viewport.
 * Children with the class `.anim` will be animated in sequence.
 */
export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const anime = await loadAnime();
          const targets = (entry.target as HTMLElement).querySelectorAll(".anim");

          if (targets.length > 0) {
            anime({
              targets,
              opacity: [0, 1],
              translateY: [40, 0],
              delay: anime.stagger(90, { start: 80 }),
              duration: 750,
              easing: "easeOutCubic",
            });
          } else {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 750,
              easing: "easeOutCubic",
            });
          }

          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref as React.RefObject<AnimatableElement>;
}

/**
 * Animate counter numbers (e.g. stats) from 0 to target.
 */
export function useCountAnimation(
  target: number,
  duration = 1800,
  start = 0
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const anime = await loadAnime();
          const counter = { value: start };

          anime({
            targets: counter,
            value: target,
            round: 1,
            duration,
            easing: "easeOutExpo",
            update() {
              if (ref.current) {
                ref.current.textContent = counter.value.toLocaleString("es-ES");
              }
            },
          });

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, start]);

  return ref as React.RefObject<AnimatableElement>;
}
