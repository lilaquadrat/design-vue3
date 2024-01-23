import type MenuItemElement from './MenuItem.interface'
import type Textblock from './textblock.interface'

export default interface MenuCategoryElement {
    textblock: Textblock
    items: MenuItemElement[]
  }
