import type { BasicData, Structure } from '@lilaquadrat/interfaces'

export default interface CategoryStructure {
    title?: string
    description?: string
    structures: BasicData<Structure & {required?: boolean}>[]
}