import { computed, watch } from 'vue';
import { ref } from 'vue';
import { type Ref } from 'vue';

class Inview {

  timeout!: NodeJS.Timeout | undefined;

  lastScrollingAdjustment = 0;

  debounceTime: number = 50;

  isTop = ref<boolean>(false);

  scrolledEvent: Event;

  scrolled = ref<number>(0);

  moduleAdded = ref<number>(0);

  scrollDirection = ref<'up' | 'down'>();

  parentElement = ref<HTMLElement>();

  lastScrollY = 0;
  lastTimestamp = 0;
  scrollVelocity = 0;

  /**
  * if true we fire an inital scroll event to indicate that scrolling has started without waiting for the debounce
  */
  triggerStart = ref<boolean>(true);

  safeWindow = computed(() => {

    if (typeof window === 'undefined') return null;
    if (this.parentElement.value) return this.parentElement.value;
    return window;

  });

  scrollY () {

    if (this.safeWindow.value instanceof Window) {

      return this.safeWindow.value.scrollY;

    }

    if (this.parentElement.value) {

      return this.parentElement.value.scrollTop;
    }

    return 0

  }

  height () {

    if (this.safeWindow.value instanceof Window) {

      return this.safeWindow.value.outerHeight;

    }

    if (this.parentElement.value) {

      return this.parentElement.value.offsetHeight;
    }

    return 0
    
  }

  constructor () {

    this.scrolledEvent = new Event('scrolled');
    this.checkIsTop();

    if (this.safeWindow.value) {

      this.safeWindow.value?.addEventListener('scroll', () => {

        this.debounce();

      });

    }

  }

  setParentElement (element: HTMLElement) {

    this.parentElement.value = element;
    this.addScrollListener(element);

  }

  addScrollListener (element: Element) {

    element.addEventListener('scroll', () => {

      const currentTimestamp = performance.now();
      const deltaY = this.scrollY() - this.lastScrollY;
      const deltaTime = currentTimestamp - this.lastTimestamp;
  
      // Calculate velocity (pixels per millisecond)
      this.scrollVelocity = Math.abs(deltaY / deltaTime);
  
      this.lastScrollY = this.scrollY();
      this.lastTimestamp = currentTimestamp;
  
      // console.log(`Scroll Velocity: ${this.scrollVelocity.toFixed(2)} pixels/ms`);

      this.debounce();

    });

  }

  trigger (isStart?: boolean) {

    if (!this.safeWindow.value) return;

    this.checkIsTop();
    this.scrollDirection.value = this.scrolled.value > this.scrollY()
      ? 'down'
      : 'up'
    this.scrolled.value = this.scrollY();

    this.safeWindow.value?.dispatchEvent(this.scrolledEvent);
    if (!isStart) this.triggerStart.value = true;

  }

  checkIsTop () {

    if (!this.safeWindow.value) return;

    this.isTop.value = this.scrollY() <= 0

  }

  debounce () {

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

  check (component: HTMLElement, state: Ref<string[]>, options?: { align?: boolean }) {
    const element = component;
    const newState: string[] = [];

    if (typeof element?.getBoundingClientRect !== 'function') return;
    if (!this.safeWindow.value) return;

    const viewportHeight = this.height();
    const height = viewportHeight / 2;
    const rect = element.getBoundingClientRect();
    let top = rect.top - height + 10;
    let bottom = rect.bottom - height + 10;
    let visibleHeight = 0;
    let marginToTop = 0;

    if (this.parentElement.value) {

      const parentRect = this.parentElement.value.getBoundingClientRect();
      // Adjust top and bottom based on parent element's top and bottom
      const parentTop = parentRect.top;
      const parentBottom = parentRect.bottom;

      top = rect.top - parentTop - height + 10;
      bottom = rect.bottom - parentTop - height + 10;

      marginToTop = Math.abs(rect.top - parentTop);

      // Adjust visibleTop and visibleBottom for parent element
      const visibleTop = Math.max(parentTop, rect.top);
      const visibleBottom = Math.min(parentBottom, rect.bottom);

      visibleHeight = Math.max(0, visibleBottom - visibleTop);

    } else {

      // Original calculations if no parent element is provided
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);

      marginToTop = Math.abs(rect.top);

      visibleHeight = Math.max(0, visibleBottom - visibleTop);

    }

    if (top > 0) {
      newState.push('inview-after');
    }

    if (top <= 0 && bottom >= 0) {
      newState.push('inview-current');
    }

    if (bottom < 0) {
      newState.push('inview-before');
    }

    // Check if more than 30% of the element is visible
    if (visibleHeight / rect.height >= 0.3) {
      newState.push('inview-visible');
    }

    if (newState.includes('inview-current') && options?.align) {

      if(!this.lastScrollingAdjustment || Date.now() - this.lastScrollingAdjustment > 1500) {

        requestAnimationFrame(() => this.adjustScrolling(element, marginToTop));

      }

    }

    state.value.length = 0;
    state.value.push(...newState);
  }

  checkPreload (component: HTMLElement, state: Ref<boolean>) {

    const preloadRange = window?.outerHeight * 2;
    const rect = component.getBoundingClientRect();

    if (rect.bottom > -preloadRange && rect.top < preloadRange) {

      state.value = true;

    }

  }

  adjustScrolling (component: HTMLElement, top: number) {

    const offset = this.height() / 10;

    if (top < offset && top > (offset * -1)) {

      this.lastScrollingAdjustment = Date.now();

      component.scrollIntoView({
        behavior: 'smooth',
      });

    }

  }

  moduleRendered () {

    this.moduleAdded.value++;

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

export function useInview (element?: Ref<HTMLElement | undefined>, options?: { align?: boolean, preload?: boolean }) {

  const state = ref<string[]>([]);
  const preload = ref<boolean>(false);

  if (element) {

    watch(element, () => {

      if (element.value) {

        inview.moduleRendered();

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

          watch(inview.moduleAdded, () => {

            requestAnimationFrame(() => {

              inview.check(element.value as HTMLElement, state, options);

            })

          })

        }

      }

    })

  }

  return { inviewState: state, scrolled: inview.scrolled, scrollDirection: inview.scrollDirection, preload };

}

export default inview;
