import type LinkListWithTitle from './LinkListWithTitle.interface';
import type ListWithTitle from './ListWithTitle.interface';
import type Textblock from './textblock.interface';

export interface Information {
textblock?: Textblock;
links?: LinkListWithTitle
list?: ListWithTitle
}