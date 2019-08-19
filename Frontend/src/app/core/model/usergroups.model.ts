import { GroupBills } from './groupbills.model';

export class UserGroups{
    _id: String
    name: String;
    participantObjects: Array<any>;
    billObjects: Array<GroupBills>;
    bills: Array<GroupBills>;
    createdBy: String;
    createdAt: Date;
    updatedAt: Date;
}