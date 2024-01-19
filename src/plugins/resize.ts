import { ref, type App } from 'vue';

class Resize {

  timeout: any;

  debounceTime: number = 50;

  resizedEvent: Event;

  mediaEvent: Event;

  media = ref<string>('mobile');

  resized = ref<number>(Date.now());

  realHeight = ref<number>(0);

  constructor () {


    this.resizedEvent = new Event('resized');
    this.mediaEvent = new Event('media');
    this.realHeight.value = window.innerHeight;

    this.getMediaQuery();

    window.addEventListener('resize', () => this.debounce());

  }


  trigger () {

    this.getMediaQuery();
    this.realHeight.value = window.innerHeight;
    this.resized.value = Date.now();
    window.dispatchEvent(this.resizedEvent);

  }

  getMediaQuery (): void {
    
    const element = document.getElementById('mediadetection');
    
    if (!element) return;

    const child = Array.from(element.children).find(child => window.getComputedStyle(child).display === 'block');


    if (child) {
      const childClass = child.getAttribute('class') as string;

      if (this.media.value !== childClass) {

        this.media.value = childClass;
        window.dispatchEvent(this.mediaEvent);

      } else {

        this.media.value = childClass;
        
      }
    }
  }


  debounce () {

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
    console.log('resize plugin installed');
  },
};


function useResize () {

  return {realHeight: resize.realHeight, media: resize.media, resized: resize.resized};

}

export default plugin;

export {
  useResize,
  resize
};
