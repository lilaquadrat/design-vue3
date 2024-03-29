import type IconsPartial from './IconsPartial';
import type Link from './link.interface';

export default interface LinkGroupElement {

    text: string;

    link?: string

    classes?: string[]

    attributes?: string[];

    links?: Link[]

    icon?: IconsPartial['type'];

  }

