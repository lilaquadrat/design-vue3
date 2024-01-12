import type LinkListWithTitle from './LinkListWithTitle.interface';
import type ListWithTitle from './ListWithTitle.interface';
import type Textblock from './textblock.interface';

export default interface AccordionElement {

    textblock?: Textblock

    list?: ListWithTitle

    links?: LinkListWithTitle

}

export interface AccordionElementWithSettings extends AccordionElement{
    visible: boolean
    height: string
    headline: string 
}