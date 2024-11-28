import { Announcement, AnnouncementSchema } from './announcement.model';
import { Event, EventSchema } from './event.model';
import { Group, GroupSchema } from './group.model';
import { JoinCode, JoinCodeSchema } from './join-code.model';
import { Role, RoleSchema } from './role.model';
import { UserAccount, UserAccountSchema } from './user-account.model';

export * from './announcement.model';
export * from './basic.model';
export * from './event.model';
export * from './group.model';
export * from './join-code.model';
export * from './role.model';
export * from './user-account.model';

export const MongooseModels = [
  {
    name: Announcement.name,
    schema: AnnouncementSchema,
    collection: 'announcements',
  },
  {
    name: Event.name,
    schema: EventSchema,
    collection: 'events',
  },
  {
    name: Group.name,
    schema: GroupSchema,
    collection: 'groups',
  },
  {
    name: JoinCode.name,
    schema: JoinCodeSchema,
    collection: 'joinCodes',
  },
  {
    name: Role.name,
    schema: RoleSchema,
    collection: 'roles',
  },
  {
    name: UserAccount.name,
    schema: UserAccountSchema,
    collection: 'userAccounts',
  },
];
