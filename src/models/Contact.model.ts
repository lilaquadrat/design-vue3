
import Models, { type ModelDeclaration } from '@/libs/Models.class';
import type { Contact } from '@lilaquadrat/interfaces';

const declaration: ModelDeclaration<Omit<Contact, 'emailConfirmed' | 'emailConfirmationCode'>> = {
  prename        : { type: 'string', default: 'Max' },
  name           : { type: 'string', default: 'Schübel' },
  email          : { type: 'string', default: 'm.schuebel@lila2.de' },
  phone          : { type: 'string' },
  message        : { type: 'string' },
  type           : { type: 'string' },
  category       : { type: 'string' },
  osm_id         : { type: 'number' },
  street         : { type: 'string' },
  streetNumber   : { type: 'string' },
  city           : { type: 'string' },
  zipcode        : { type: 'string' },
  country        : { type: 'string' },
  addressAddition: { type: 'string' },
};

Models.register('contact', declaration);
