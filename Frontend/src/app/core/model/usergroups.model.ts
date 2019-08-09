import { User } from './user.model';
import { GroupBills } from './groupbills.model';

export class UserGroups{
    name: String;
    participants: Array<User>;
    bills: Array<GroupBills>;
    createdBy: String;
    createdAt: Date;
    updatedAt: Date;
}