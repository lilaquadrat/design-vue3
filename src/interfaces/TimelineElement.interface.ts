import type Picture from './picture.interface';
import type Video from './video.interface';
import type Textblock from './textblock.interface';
import type ListWithTitle from './ListWithTitle.interface';
import type LinkListWithTitle from './LinkListWithTitle.interface';
import type Quote from './Quote.interfaces';

export interface TimelineElement {
    media: ({type: 'picture'} & Picture | {type: 'video'} & Video)[]
    textblock?: Textblock;
    list?: ListWithTitle;
    links?: LinkListWithTitle;
    quote?: Quote;
}
export interface TimelineElementWithSettings extends TimelineElement{
    isActive: boolean
}
