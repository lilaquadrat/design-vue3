
export interface MediaInfo {
    width?: number
    height?: number
    ratio?: number
}

export interface MediaViewInfo {
    width?: number
    padding?: number
    src?: string
    thumb?: string
    loading?: boolean
}

export default interface MediaModel {
    _id?: string

    company?: string
    filename?: string
    originalname?: string
    type?: string
    size?: number
    tags?: string[]
    image?: boolean
    video?: boolean
    mimetype?: string

    info?: MediaInfo
    view?: MediaViewInfo
    download?: string
}
