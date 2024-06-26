import type { ModuleGeneric } from '@lilaquadrat/interfaces';

export default interface GenericState {
  [key: string]: {[key: string]: string | string[]} | number | boolean | string | string[] | ModuleGeneric[] | Date | any;
}
