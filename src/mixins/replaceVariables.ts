import type { Customers, Me } from '@lilaquadrat/interfaces';
import objectPath from 'object-path';

export default (template?: string, variables?: Record<string, string | undefined | Record<string, string> | Customers | Me>) => template?.replace(/\$([\w.]+)/g, (match, name) => {
  // Check if the placeholder's name exists in the variables object
  if(!variables) return '';

  console.log(variables);

  const returnString = objectPath.get(variables as Record<string, string>, name);

  return returnString || '';
});