import type Link from './link.interface';
import type LinkListWithTitle from './LinkListWithTitle.interface';

// export default interface Sitemap {
//     title?: string
//     elements: {
//         title?: string
//         elements: Link[]
//     }[]
// }

export default interface Sitemap {
    elements?: {
        links: LinkListWithTitle;
    }
}
