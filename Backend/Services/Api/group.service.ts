import { ApiResponse } from "../../Models/response.model";
import { UserService } from "./user.service";
const {ObjectId} = require('mongodb');

export class GroupService{

    static checkGroupExistence(name: string) {
        console.log("checkGroupExistence called");
        const groupModel = require("../../Models/group.model");

        groupModel.findOne({ name: name }).then((result: any) => {
            if (result == null){
                return true;
            }
        });
        return false;
    }

    static getBillGroup(billId: String){
        const groupModel = require("../../Models/group.model");
        return new Promise((resolve,reject)=>{
            groupModel.aggregate([
                { '$match': { 'bills': { '$in': [ObjectId(billId)] } } }
            ]).then((result: any)=>{
                resolve(result[0]._id);
            })
        })
        
    }

    static async createGroupService(request: any, response: any, creatorId: string){
        //check if all participants are valid and name of group does not exist in db
        if(this.checkGroupExistence(request.body.name) && UserService.checkUserExistence(request.body.participants)){
            const respObj: ApiResponse<any> = {msg: "Group creation error", data: null};
            response.status(409).send(respObj);
        }
        else{
            //fetch objectId for users
            let participantsEmail = request.body.participants;
            participantsEmail.push(creatorId);
            let participantsId: any = await UserService.getUserIds(participantsEmail);

            let group = require('../../Models/group.model');

            //create object of mongoose.Schema
            const newGroup = new group({
                name: request.body.name,
                participants: participantsId,
                createdAt: new Date,
                updatedAt: new Date,
                createdBy: await UserService.getUser(participantsId[participantsId.length-1])
            });
            
            //save newly created document in groups table
            newGroup.save().then(()=>{
                const resObj: ApiResponse<any> = { msg: 'Group created successfully.', data: null };
                response.status('201').send(resObj);
            }).catch((error: any) => {
                const resObj: ApiResponse<string> = { msg: 'Error creating group.', data: error };
                response.status('400').send(resObj);
            });
        }
    }

    static getUserGroups(response: any, currentUserId: string){
        const groupModel = require("../../Models/group.model");
        groupModel.aggregate([
            { '$match': { 'participants': { '$in': [ObjectId(currentUserId)] } } },
            {
                "$lookup": {
                    "from": "bills",
                    "localField": "bills",
                    "foreignField": "_id",
                    "as": "billObjects"
                }
            },{
                "$lookup": {
                    "from": "users",
                    "localField": "participants",
                    "foreignField": "_id",
                    "as": "participantObjects"
                }
            }, { "$sort" : { "createdAt" : -1 }},
            {
                "$project" : {
                    "participantObjects._id" : 0,
                    "participantObjects.password": 0,
                    "participantObjects.createdAt": 0,
                    "participantObjects.updatedAt": 0,
                    "participants":0
                }
            }
        ]).then((result: any)=>{
            if(result){
                const respObj: ApiResponse<any> = {msg: "Groups corresponding to current user", data: result};
                response.status(200).send(respObj);
            }
        }).catch((error: any)=>{
            const respObj: ApiResponse<any> = {msg: "Error fetching user groups.", data: error};
            response.status(409).send(respObj);
        });
    }
}