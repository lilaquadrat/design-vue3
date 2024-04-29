import type Link from "./link.interface"
import type LinkListWithTitle from "./LinkListWithTitle.interface"
import type ListWithTitle from "./ListWithTitle.interface"
import type Picture from "./picture.interface"
import type Textblock from "./textblock.interface"
import type Video from "./video.interface"

export default interface Event {
    variant: string[]
    artist: string
    name: string
    location: string
    description: string
    start: Date
    end: Date
    textblock: Textblock
    video: Video
    picture: Picture
    list: ListWithTitle
    links: LinkListWithTitle
    link: Link
  }