export interface VideoSource {
  media: string
  source: string
}

export default interface Video {
  [x: string]: any

  src: string

  attributes?: string[]
  source?: VideoSource[]

}
