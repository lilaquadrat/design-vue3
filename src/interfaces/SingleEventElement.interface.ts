import type IconsPartial from './IconsPartial.interface';
import type Link from './link.interface';
import type Textblock from './textblock.interface';
import type Video from './video.interface';

export default interface SingleEventElement {
    link: Link;
    icon?: IconsPartial['type'];
    textblock: Textblock;
    details: Textblock;
    video?: Video;
    startDate: string;
    endDate: string;
    // media: ((Video | Textblock ) & {type: string})[]
}