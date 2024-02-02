export default interface Contact {
    prename: string
    name: string
    email: string
    phone: string
    message?: string
    type: string
    category?: string
    osm_id: number
    street: string
    streetNumber: string
    city: string
    zipcode: string
    country: string
    addressAddition: string
  }