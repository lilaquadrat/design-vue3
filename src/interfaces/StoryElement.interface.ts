import type { Media } from '@lilaquadrat/interfaces'
import type Link from './link.interface'
import type Textblock from './textblock.interface'

export default interface StoryElement {
    textblock: Textblock
    media: Media
    link: Link
  }
  