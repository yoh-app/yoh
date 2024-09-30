import { default as publicSchema } from './public.json';

import WebsiteParents from './admin/Website/relations.json';
import WebsiteSchema from './admin/Website/schema.json';
import WebsiteModelLimits from './admin/Website/modelLimits.json';

import UserParents from './admin/User/relations.json';
import UserSchema from './admin/User/schema.json';
import UserModelLimits from './admin/User/modelLimits.json';

export const permissions = [
  {
    admin: 'Public',
    schema: publicSchema,
    parents: [],
  },
  {
    admin: 'Website',
    schema: WebsiteSchema,
    modelLimits: WebsiteModelLimits,
    parents: WebsiteParents,
  },
  {
    admin: 'User',
    schema: UserSchema,
    modelLimits: UserModelLimits,
    parents: UserParents,
  },
];
