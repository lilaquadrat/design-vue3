export default interface EventDeclaration {
  id: string;
  name: string;
  description: string;
  confirmRequired?: boolean;
  /**
   * the event is async and we need to show a animation on execute
   */
  operation?: boolean;
  feedback?: {
    pending?: string;
    resolved?: string;
    rejected?: string;
  };
  additionalData?: {
    name: string;
    description: string;
  };
}
