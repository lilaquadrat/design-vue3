export default interface ModuleBaseProps {
    sub?: boolean
    id?: string
    parentId: string
    uuid: string
    variant?: string[]
    index?: {title?: string, anchor?: string}
}