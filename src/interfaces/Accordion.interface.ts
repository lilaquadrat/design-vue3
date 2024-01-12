import type AccordionElement from './AccordionElement.interface';

export default interface Accordion {

    multiOpen?: boolean
    disableControls?: boolean
    openOnStart?: 'first' | 'all'
    renderTarget?: 'web' | 'pdf'
    variant?: string[]

    elements: AccordionElement[]

}

