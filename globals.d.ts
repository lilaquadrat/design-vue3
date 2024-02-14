declare global {

    interface Window {
      onYouTubeIframeAPIReady: () => void;
    }

    const __FRONTEND_CONFIG__: FrontendConfig;
}
  
export {};
  