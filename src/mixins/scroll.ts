import type { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router';

interface ScrollPosition {
  left: number;
  top: number;
  behavior?: ScrollBehavior;
}

// Add this constant at the top of the file, after the interfaces
const GENERAL_OFFSET = 20;

// Helper function to calculate the total height of fixed or overlaying elements.
function getFixedElementsOffset (): number {
  const selectors: string[] = ['.anchor-calculation'];

  return selectors.reduce((total, selector) => {
    const el = document.querySelector(selector) as HTMLElement | null;

    return el ? total + el.offsetHeight : total;
  }, 0);
}

/**
 * scroll into view with calulated offset from fixed overlay elements
 */
export function scrollToSelector (selector: string): Promise<void> {
  return new Promise((resolve) => {
    const targetEl = document.querySelector(selector) as HTMLElement | null;

    if (targetEl) {
      const offset = getFixedElementsOffset();
      const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        left    : 0,
        top     : elementTop - offset - GENERAL_OFFSET,
        behavior: 'smooth'
      });
    }

    resolve();
  });
}
/**
 * scroll into view with calulated offset from fixed overlay elements
 * usage for vue-router scrollBehavior
 */
export const smartScrollBehavior: RouterScrollBehavior = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  savedPosition: ScrollPosition | null | undefined
): ReturnType<RouterScrollBehavior> => {
  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {

    return new Promise((resolve) => {

      const targetEl = document.querySelector(to.hash) as HTMLElement | null;

      if (targetEl) {

        const offset = getFixedElementsOffset();
        const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;

        resolve({ 
          left    : 0,
          top     : elementTop - offset - GENERAL_OFFSET,
          behavior: 'smooth'
        });

      } else {
        resolve({ left: 0, top: 0 });
      }

    });
    
  }

  return { left: 0, top: 0 };
};
