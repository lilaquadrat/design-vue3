import type Picture from "./picture.interface";
import type Video from "./video.interface";
import type Textblock from "./textblock.interface";
import type ListWithTitle from "./ListWithTitle.interface";
import type LinkListWithTitle from "./LinkListWithTitle.interface";

export interface TimelineElement {
    picture?: Picture;
    // pictures: Picture[];
    video?: Video;
    // videos: Video[];
    
}