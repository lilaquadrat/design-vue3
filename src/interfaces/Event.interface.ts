import type EventsElement from './EventsElement.interface'
import type Textblock from './textblock.interface';

export default interface Event {
    event: Event[];
    textblock: Textblock;
    // sameDate: boolean;
}