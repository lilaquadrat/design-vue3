export default (template?: string, variables?: { [key: string]: string | undefined }) => template?.replace(/\$(\w+)/g, (match, name) => {
  // Check if the placeholder's name exists in the variables object

  if(!variables) return '';

  const returnString = variables[name] as string;
      
  return returnString || '';
});