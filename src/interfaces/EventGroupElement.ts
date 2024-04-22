import type IconsPartial from './IconsPartial.interface';
import type Link from './link.interface';
import type Picture from './picture.interface';
import type Textblock from './textblock.interface';

export default interface EventGroupElement {
    link: Link;
    icon?: IconsPartial['type'];
    textblock: Textblock;
    picture?: Picture;
    moreText?: Link;
    startDate: string;
    endDate: string;
}

