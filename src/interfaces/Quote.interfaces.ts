import type Link from "./link.interface";

export default  interface Quote {
    quote: string;
    link?: Link;
    citation?: string
}