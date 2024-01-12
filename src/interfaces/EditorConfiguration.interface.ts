export interface EditorTitleDescription {
    short?: string
    full?: string
}
export default interface EditorConfiguration {

    editorUrl?: string
    breakpointTablet?: string
    breakpointDesktop?: string
    breakpointWide?: string
    preloadImages?: boolean
    title?: EditorTitleDescription
    description?: EditorTitleDescription

}