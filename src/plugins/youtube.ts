import { ref } from 'vue';

class Youtube {

  youtubeApiState = ref<boolean>(false);

  loadState = ref<boolean>(false);

  loadApi () {

    if(this.loadState.value) return Promise.resolve();
    
    return new Promise<void>((resolve) => {
      
      const script = document.createElement('script');
      
      script.src = 'https://www.youtube.com/iframe_api';
      
      script.onload = () => {
        
        console.log('youtube api loaded');
        
        resolve();
      };
      
      document.body.appendChild(script);
      this.loadState.value = true;
            
    });
  }

  /**
   * load the youtube iframe api and changes the youtubeApiState to true when all is ready
   */
  addYoutube () {

    if(!this.youtubeApiState.value) {

      this.loadApi()

    }
  
  }

}

const youtubePlugin = new Youtube();
const plugin = {
  install: (): void => {
    // this exists only for initialization purposes
    console.log('youtube plugin installed');
  },
};

window.onYouTubeIframeAPIReady = () => {

  youtubePlugin.youtubeApiState.value = true;
  
};
  
function useYoutube () {
      
  return {
    youtubeApiState: youtubePlugin.youtubeApiState, 
    /**
    * loads the youtube iframe api and changes the youtubeApiState to true when all is ready
    */
    addYoutube     : () => youtubePlugin.addYoutube()
  };
      
}

export default plugin;
  
export {
  useYoutube
};
  