
import Models, { type ModelDeclaration } from '@/libs/Models.class';
import type { Contact } from '@lilaquadrat/interfaces';

const declaration: ModelDeclaration<Omit<Contact, 'emailConfirmed' | 'emailConfirmationCode'>> = {
  prename        : { type: 'string' },
  name           : { type: 'string' },
  email          : { type: 'string' },
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
