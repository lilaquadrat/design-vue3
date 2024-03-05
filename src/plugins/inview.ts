import { computed, reactive, watch } from 'vue';
import { ref } from 'vue';
import { type Ref } from 'vue';

class Inview {

  timeout!: NodeJS.Timeout | undefined;

  debounceTime: number = 50;

  isTop = ref<boolean>(false);

  scrolledEvent: Event;

  scrolled = ref<number>(0);

  scrollDirection = ref<'up' | 'down'>();

  /**
  * if true we fire an inital scroll event to indicate that scrolling has started without waiting for the debounce
  */
  triggerStart = ref<boolean>(true);

  safeWindow = computed(() => {

    if (typeof window === 'undefined') return null;
    return window;

  });

  constructor() {

    this.scrolledEvent = new Event('scrolled');
    this.checkIsTop();

    if (this.safeWindow.value) {

      this.safeWindow.value?.addEventListener('scroll', () => {

        this.debounce();

      });

    }

  }

  addScrollListener(element: Element) {

    element.addEventListener('scroll', () => {

      this.debounce();

    });

  }

  trigger(isStart?: boolean) {

    this.checkIsTop();
    this.scrollDirection.value = this.scrolled.value > this.safeWindow.value?.scrollY
      ? 'down'
      : 'up'
    this.scrolled.value = this.safeWindow.value?.scrollY;

    this.safeWindow.value?.dispatchEvent(this.scrolledEvent);
    if (!isStart) this.triggerStart.value = true;

  }

  checkIsTop() {

    this.isTop.value = this.safeWindow.value?.scrollY <= 0

  }

  debounce() {

    /**
     * indicates that the scrolling has begun and fire an inital scrolling event without waiting for the debounce
     */
    if (this.triggerStart.value) {

      this.triggerStart.value = false;
      this.trigger(true);

    }

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.trigger();

    }, this.debounceTime);

  }

  check(component: HTMLElement, state: Ref<string[]>, options?: { align?: boolean }) {

    const element = component;
    const newState = [];

    if (typeof element?.getBoundingClientRect !== 'function') return;

    const viewportHeight = this.safeWindow.value?.outerHeight;
    const height = this.safeWindow.value?.outerHeight / 2;
    const rect = element.getBoundingClientRect();
    const top = rect.top - height + 10;
    const bottom = rect.bottom - height + 10;
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (top > 0) {

      newState.push('inview-after');

    }

    if (top <= 0 && bottom >= 0) {

      newState.push('inview-current');

    }

    if (bottom < 0) {

      newState.push('inview-before');

    }

    // check if more than 30% of the element is visible
    if (visibleHeight / rect.height >= 0.3) {

      newState.push('inview-visible');

    }

    if (state.value.includes('inview-current') && options?.align) {
      requestAnimationFrame(() => this.adjustScrolling(element, rect.top));
    }

    state.value.length = 0;
    state.value.push(...newState);

  }

  checkPreload(component: HTMLElement, state: Ref<boolean>) {

    const preloadRange = window?.outerHeight * 2;
    const rect = component.getBoundingClientRect();

    if (rect.bottom > -preloadRange && rect.top < preloadRange) {

      state.value = true;

    }

  }

  adjustScrolling(component: HTMLElement, top: number) {

    const offset = window?.outerHeight / 10;

    if (top < offset && top > (offset * -1)) {

      component.scrollIntoView({
        behavior: 'smooth',
      });

    }

  }

}

const inview = new Inview();

/**
 * the preload option is used to check if the element is in range of two times of the viewport and changes the preload value accordingly
 *
 * without the preload options the inviewState array holds the following values
 ** inview-before - the element is before the viewport
 ** inview-current - the element is centered in the viewport
 ** inview-after - the element is after the viewport
 ** inview-visible - more than 30% of the element are visible in the current viewport, regardless if it is centered or nor
 */

export function useInview(element?: Ref<HTMLElement | undefined>, options?: { align?: boolean, preload?: boolean }) {

  const state = ref<string[]>([]);
  const preload = ref<boolean>(false);

  if (element) {

    watch(element, () => {

      if (element.value) {

        if (options?.preload) {

          inview.checkPreload(element.value, preload);

          const unwatchPreload = watch(inview.scrolled, () => {

            if (!element.value) return;

            inview.checkPreload(element.value as HTMLElement, preload);

            //unwatch when the preload value is true
            if (preload.value) unwatchPreload();

          })

        } else {

          inview.check(element.value, state, options);

          watch(inview.scrolled, () => {

            inview.check(element.value as HTMLElement, state, options)

          })

        }

      }

    })

  }

  return { inviewState: state, scrolled: inview.scrolled, scrollDirection: inview.scrollDirection, preload };

}

export default inview;
