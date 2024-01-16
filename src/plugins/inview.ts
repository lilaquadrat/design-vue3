import { watch, type WatchStopHandle } from 'vue';
import { ref } from 'vue';
import { type Ref } from 'vue';

class Inview {

  timeout!: NodeJS.Timeout;

  debounceTime: number = 50;

  isTop = false;

  scrolledEvent: Event;

  scrolled = ref<number>(window.scrollY); 

  scrollDirection = ref<'up'|'down'>();

  constructor () {

    this.scrolledEvent = new Event('scrolled');
    this.checkIsTop();

    window.addEventListener('scroll', () => {

      this.debounce();

    });

  }

  addScrollListener (element: Element) {

    element.addEventListener('scroll', () => {

      this.debounce();

    });

  }

  trigger () {

    this.checkIsTop();
    this.scrollDirection.value = this.scrolled.value > window.scrollY 
      ? 'down'
      : 'up'
    this.scrolled.value = window.scrollY;

    window.dispatchEvent(this.scrolledEvent);

  }

  checkIsTop () {

    this.isTop = window.scrollY > 0

  }

  debounce () {

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.trigger();

    }, this.debounceTime);

  }

  check (component: HTMLElement, state: Ref<string[]>, options?: {align?: boolean}) {

    const element = component;

    if (typeof element?.getBoundingClientRect !== 'function') return;

    const viewportHeight = window.outerHeight;
    const height = window.outerHeight / 2;
    const rect = element.getBoundingClientRect();
    const top = rect.top - height + 10;
    const bottom = rect.bottom - height + 10;
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (top > 0) {

      state.value = ['inview-after'];

    }

    if (top <= 0 && bottom >= 0) {

      state.value = ['inview-current'];

    }

    if (bottom < 0) {

      state.value = ['inview-before'];

    }

    // check if more than 30% of the element is visible
    if (visibleHeight / rect.height >= 0.3) {

      state.value.push('inview-visible');

    }

    if(state.value.includes('inview-current') && options?.align) {
      requestAnimationFrame(() => this.adjustScrolling(element, rect.top));
    }

  }

  checkPreload (component: HTMLElement, state: Ref<boolean>) {

    const preloadRange = window.outerHeight * 2;
    const rect = component.getBoundingClientRect();

    if(rect.bottom > -preloadRange && rect.top < preloadRange) {

      state.value = true;

    }

  }


  // checkImage (component) {

  //   const element = component.$el;

  //   if (typeof element.getBoundingClientRect !== 'function') return;

  //   const height = document.body.getBoundingClientRect().height * 2;
  //   const rect = element.getBoundingClientRect();
  //   const { top } = rect;
  //   const { bottom } = rect;

  //   if (component.loading) return;

  //   if (top <= height && bottom >= 0) {

  //     component.loading = true;
  //     return;

  //   }

  //   if (top <= 0 && bottom + height >= 0) {

  //     component.loading = true;

  //   }

  // }

  adjustScrolling (component: HTMLElement, top: number) {

    const offset = window.outerHeight / 10;

    if (top < offset && top > (offset * -1)) {

      component.scrollIntoView({
        behavior: 'smooth',
      });

    }

  }

}

const inview = new Inview();

export function useInview (element: Ref<HTMLElement | undefined>, options?: {align?: boolean, preload?: boolean}) {

  const state = ref<string[]>(['inview']);
  const preload = ref<boolean>(false);

  watch(element, () => {

    if(element.value) {

      if(options?.preload) {


        inview.checkPreload(element.value, preload);

        const unwatchPreload = watch(inview.scrolled, () => {

          inview.checkPreload(element.value as HTMLElement, preload);

          if(preload.value) unwatchPreload();

        })

      } else {

        inview.check(element.value, state, options);
  
        watch(inview.scrolled, () => {
  
          inview.check(element.value as HTMLElement, state, options)
  
        })

      }
  
  
    }

  })


  return {inviewState: state, scrolled: inview.scrolled, scrollDirection: inview.scrollDirection, preload};

}

export default inview;
