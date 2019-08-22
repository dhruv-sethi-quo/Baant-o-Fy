import { ApiResponse } from "../../Models/response.model";
import { UserService } from "./user.service";
import { GroupService } from "./group.service";
import { DebtService } from "./debt.service";

export class BillService{
    
    static async createBill(request: any, response: any, createdBy: String){

        let bill = require("../../Models/bill.model");
        let group = require("../../Models/group.model");
        let participants: any=[];

        for(let i=0;i<request.body.participants.length;i++){
            let result = await UserService.getUserbyEmail(request.body.participants[i]);
            participants.push(result);
        }

        const newBill = new bill({
            name: request.body.name,
            amount: request.body.amount,
            paidBy: await UserService.getUserbyEmail(request.body.paidBy),
            participants: participants,
            createdBy: await UserService.getUserbyEmail(createdBy),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log("Bill is ", newBill);

        newBill.save().then((result: any)=>{
            group.findOneAndUpdate({_id: request.body.groupId},{
                $push: {
                    bills: newBill._id
                }
            }).then(()=>{
                if(DebtService.createDebt(newBill, request.body.groupId)){
                    const obj: ApiResponse<any> = {msg: "Group created and debts updated successfully!", data: null};
                    response.status(200).send(obj);
                }
                else{
                    const obj: ApiResponse<any> = {msg: "Error updating debts!", data: null};
                    response.status(400).send(obj);
                }
            }).catch((error:any)=>{
                const obj: ApiResponse<any> = {msg: "Error updating group", data: error};
                response.status(400).send(obj);
            });
        }).catch((error: any)=>{
            const obj: ApiResponse<any> = {msg: "Error saving bill!", data: error};
            response.status(400).send(obj);
        });
    }

    static async deleteBill(request: any, response: any){
        const billModel = require("../../Models/bill.model");
        const groupModel = require("../../Models/group.model");
        const billId = request.body.id;
        const groupId = await GroupService.getBillGroup(billId);

        billModel.remove({_id: billId}).then(()=>{
            groupModel.update({_id: groupId},{
                $pull: {bills: billId}
            })
            .then(()=>{
                const respObj: ApiResponse<any> = {msg: "Bill deleted successfully", data: null};
                response.status(200).send(respObj);
            }).catch((error: any)=>{
                const respObj: ApiResponse<String> = {msg: "Group updation error", data: error};
                response.status(400).send(respObj);
            });
        }).catch((error: any)=>{
            const respObj: ApiResponse<String> = {msg: "Bill deletion error", data: error};
            response.status(400).send(respObj);
        });
    }
}