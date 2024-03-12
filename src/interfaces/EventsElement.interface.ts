import type IconsPartial from "./IconsPartial.interface";
import type Link from "./link.interface";
import type Picture from "./picture.interface";
import type Textblock from "./textblock.interface";
import type Video from "./video.interface";



export default interface EventsElement{
    link: Link[];
    icon: IconsPartial['type'];
    textblock: Textblock;
    video?: Video;
    picture?: Picture[];
    moreText?: Link[];
}

export interface EventsElementWithSettings extends EventsElement{
    visible: boolean
}