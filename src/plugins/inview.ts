import { watch } from 'vue';
import { ref } from 'vue';
import { type Ref } from 'vue';

class Inview {

  timeout: NodeJS.Timeout;

  debounceTime: number = 50;

  isTop = false;

  scrolledEvent: any;

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
    window.dispatchEvent(this.scrolledEvent);

  }

  checkIsTop () {

    if (window.scrollY > 0) {

      this.isTop = false;

    } else {

      this.isTop = true;

    }

  }

  debounce () {

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.trigger();

    }, this.debounceTime);

  }

  check (component: HTMLElement, state: Ref<string>, align?: boolean) {

    const element = component;

    if (typeof element?.getBoundingClientRect !== 'function') return;

    const height = window.outerHeight / 2;
    const rect = element.getBoundingClientRect();
    const top = rect.top - height + 10;
    const bottom = rect.bottom - height + 10;

    if (top > 0) {

      state.value = 'inview-after';

    }

    if (top <= 0 && bottom >= 0) {

      state.value = 'inview-current';

    }

    if (bottom < 0) {

      state.value = 'inview-before';

    }

    if(state.value === 'inview-current' && align) {
      requestAnimationFrame(() => this.adjustScrolling(element, rect.top));
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

export function useInview (element: Ref<HTMLElement | undefined>, align?: boolean) {

  const state = ref<string>('inview');

  watch(element, () => {

    if(element.value) {

      inview.check(element.value, state);
      window.addEventListener('scrolled', () => inview.check(element.value as HTMLElement, state, align))
  
    }

  })


  return state;

}

export default inview;
