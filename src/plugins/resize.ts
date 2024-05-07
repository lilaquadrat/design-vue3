import logger from '@/mixins/logger';
import { ref, computed } from 'vue';

class Resize {

  timeout: any;

  debounceTime: number = 50;

  resizedEvent: Event;

  mediaEvent: Event;

  media = ref<string>('mobile');

  resized = ref<number>(Date.now());

  realHeight = ref<number>(0);

  /**
  * if true we fire an inital resied event to indicate that resizing has started without waiting for the debounce
  */
  triggerStart = ref<boolean>(true); 

  safeWindow = computed(() => {

    if(typeof window === 'undefined') return null;
    return window;

  });

  constructor () {

    this.resizedEvent = new Event('resized');
    this.mediaEvent = new Event('media');
    this.realHeight.value = this.safeWindow.value?.innerHeight || 0;

    this.getMediaQuery();

    this.safeWindow.value?.addEventListener('resize', () => this.debounce());

  }

  trigger (isStart?: boolean) {

    this.getMediaQuery();

    if(this.safeWindow.value) {

      this.realHeight.value = this.safeWindow.value?.innerHeight;
    }

    this.resized.value = Date.now();
    this.safeWindow.value?.dispatchEvent(this.resizedEvent);

    if(!isStart) this.triggerStart.value = true;

  }

  getMediaQuery (): void {

    if(typeof document === 'undefined') return;
    
    const element = document.getElementById('mediadetection');
    
    if (!element) return;

    const child = Array.from(element.children).find(child => this.safeWindow.value?.getComputedStyle(child).display === 'block');

    if (child) {
      const childClass = child.getAttribute('class') as string;

      if (this.media.value !== childClass) {

        this.media.value = childClass;
        this.safeWindow.value?.dispatchEvent(this.mediaEvent);

      } else {

        this.media.value = childClass;
        
      }
    }
  }

  debounce () {

    /**
     * indicates that the scrolling has begun and fire an inital scrolling event without waiting for the debounce
     */
    if(this.triggerStart.value) {

      this.triggerStart.value = false;
      this.trigger(true);
    
    } 

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.trigger();

    }, this.debounceTime);

  }

}

const resize = new Resize();
const plugin = {
  install: (): void => {
    // this exists only for initialization purposes
    logger.plugins('resize installed');
  },
};

function useResize () {

  return {realHeight: resize.realHeight, media: resize.media, resized: resize.resized, plugin: resize};

}

export default plugin;

export {
  useResize,
  resize
};
