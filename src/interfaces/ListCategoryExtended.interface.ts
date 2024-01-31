import type { ListCategory } from '@lilaquadrat/interfaces';

type ListCategoryExtended = ListCategory &
    {
        used?: number
        available?: number
        percentUsed?: number
        percentAvailable?: number
    };

export {type ListCategoryExtended};
