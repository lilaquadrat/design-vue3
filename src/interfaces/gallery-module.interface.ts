import { type GalleryElement } from './galleryElement.interface';
import type ModuleEditor from './ModuleEditor.interface';

export default interface GalleryModule extends ModuleEditor {

   options?: any;

   description?: {
       headline?: string;
       subline?: string;
   }

   elements: GalleryElement[]

}
