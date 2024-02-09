import type Link from './link.interface';
import type LinkListWithTitle from './LinkListWithTitle.interface';
import type ListWithTitle from './ListWithTitle.interface';
import type Picture from './picture.interface';
import type Textblock from './textblock.interface';

export default interface PicturegroupElement {
    picture?: Picture;
    link?: Link;
    textblock?: Textblock;
    list?: ListWithTitle
    links?: LinkListWithTitle;

  }

