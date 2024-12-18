export default interface Link {

    text: string
    attributes?: string[]
    link?: string
    event?: string,
    query?: URLSearchParams
    external?: boolean

}
