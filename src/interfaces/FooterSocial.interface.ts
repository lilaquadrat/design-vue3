import type Link from './link.interface';
import type PictureGroupElement from './PictureGroupElement.interface';

export default interface FooterSocial {

    title: string;

    link: Link;

    elements: (PictureGroupElement & {link: Link})[];
  }
