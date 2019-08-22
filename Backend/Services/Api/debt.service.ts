export class DebtService{

    static getPayingParticipants(participants: any, paidby: any){
        return participants.filter((participant: any)=>{
            return participant.email!=paidby.email;
        });
    }
   
    static createDebt(billObject: any, groupId: String){
        let debts: any=[];
        let debtModel = require("../../Models/debts.model");

        this.getPayingParticipants(billObject.participants,billObject.paidBy).forEach((participant: any) => {
            let debt = new debtModel({
                payer: participant,
                payee: billObject.paidBy,
                amount: billObject.amount/billObject.participants.length,
                allPaid: false,
                groupId: groupId,
                billId: billObject._id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            debts.push(debt);
        });
        return this.saveDebt(debts);
    }

    static saveDebt(debts: any){
        let debtModel = require("../../Models/debts.model");

        return debtModel.create(debts).then(()=>{
            return true;
        }).catch((error: any)=>{
            return false;
        });
    }

    static getDebts(request:any, response: any, currentUser: String){

        const debtModel = require("../../Models/debts.model");

        debtModel.aggregate([
            { '$match': {
                 '$or': [
                    { 'payer.email': currentUser},
                    { 'payee.email': currentUser }
                ]
            }},
            {
                '$lookup': {
                    "from": "bills",
                    "localField": "billId",
                    "foreignField": "_id",
                    "as": "billObjects",
                }
            },
            {
                '$lookup': {
                    "from": "groups",
                    "localField": "groupId",
                    "foreignField": "_id",
                    "as": "groupObjects",
                }
            }, { "$sort" : { "createdAt" : -1 }},
            {
                "$project" : {
                    "billObjects._id" : 0,
                    "billObjects.participants": 0,
                    "billObjects.updatedAt": 0,
                    "billObjects.paidBy": 0,
                    "billId":0,
                    "groupId":0
                }
            }
        ]);

    }
}