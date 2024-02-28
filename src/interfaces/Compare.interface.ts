import type CompareElement from './CompareElement.interface';
import type CompareStructure from './CompareStructure.interface';

export default interface Compare {
    structure: CompareStructure[]
    elements: CompareElement[]
}
