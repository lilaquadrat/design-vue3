import type { SingleDeclaration } from '@/libs/Models.class';
import type { BasicData, Structure } from '@lilaquadrat/interfaces';

export default function createModelDeclaration (structure: BasicData<Structure & {required: boolean}>): SingleDeclaration {

  if(!structure) {
    throw new Error('Structure is required');
  }

  switch(structure.type) {
  case 'string':
  case 'text':
    return { type: 'string' };
    
  case 'number':
    return { type: 'number' };
    
  case 'boolean':
    return { type: 'boolean' };
    
  case 'select':
    return structure.multiple 
      ? { type: 'array', contains: { type: 'string' } }
      : { type: 'string' };
    
  default:
    return {} as SingleDeclaration;
  }
}