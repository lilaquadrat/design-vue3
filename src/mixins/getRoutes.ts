import { dynamicRoutes, previewRoutes, editorRoutes } from '../routes';
import logger from './logger';

export default () => {

  const config = __FRONTEND_CONFIG__;
  const mode = import.meta.env.MODE;
  const isIframe = window !== window.top;
  const isDynamic = config.dynamic;

  console.log(mode, isIframe, config);

  /**
   * running in an iframe indicates that we are in the STUDIO editor
   */
  if(isIframe) {

    logger.router('mode: editor routes');
    return editorRoutes;
  }

  /**
   * no iframe but development mode indicates that the design is started locally
   */
  if(mode === 'development' && !isDynamic) {
    
    logger.router('mode: preview routes');
    return previewRoutes
    
  }

  logger.router('mode: dynamic routes');
  return dynamicRoutes;

}