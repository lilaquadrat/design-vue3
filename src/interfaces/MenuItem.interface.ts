import type Picture from './picture.interface'

export default interface MenuItemElement {
    title: string
    description: string
    price: string
    properties: string[]
    allergens: string[]
    picture: Picture
}
