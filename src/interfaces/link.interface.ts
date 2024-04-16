import type EventsElement from './SingleEventElement';

export default interface Link {

    text: string;
    attributes?: string[];
    link: string,
    query?: URLSearchParams,
    external?: boolean

}
