import type { StateTree } from 'pinia';

declare global {

  interface Window {
    onYouTubeIframeAPIReady: () => void
    __INITIAL_STATE__?: Record<string, StateTree>
  }

  const __FRONTEND_CONFIG__: FrontendConfig;
  const __TARGET__: string;
}

export { };
