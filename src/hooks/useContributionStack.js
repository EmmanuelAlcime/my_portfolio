// Detects when contribution cards scroll past viewport and adds stacking class (mobile only)

import { useEffect, useRef } from "react";

const MOBILE_BREAKPOINT = 767;
const STACK_THRESHOLD = 120; // px from top - card stacks when it scrolls past this

export const useCardStacking = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        container
          .querySelectorAll(".contribution-proxify-card")
          .forEach(card => {
            card.classList.remove("stacking");
          });
        return;
      }

      const cards = container.querySelectorAll(".contribution-proxify-card");
      const containerRect = container.getBoundingClientRect();

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;

        // Container is sticky at top when we've scrolled into it; stack cards that have passed the threshold
        const isInStackingZone = containerRect.top <= STACK_THRESHOLD;
        const hasScrolledPast = cardTop < STACK_THRESHOLD;

        if (isInStackingZone && hasScrolledPast) {
          card.classList.add("stacking");
        } else {
          card.classList.remove("stacking");
        }
      });
    };

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        container
          .querySelectorAll(".contribution-proxify-card")
          .forEach(card => {
            card.classList.remove("stacking");
          });
      } else {
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return containerRef;
};

export default useCardStacking;
