import type SingleEventElement from './SingleEventElement';
import type Textblock from './textblock.interface';

export default interface Eventgroup {
    event: SingleEventElement[];
    textblock: Textblock;
}