import { ApiResponse } from "../../Models/response.model";

export class ApiService{

    static checkGroupExistence(name: string) {

        const groupModel = require("../../Models/group.model");

        groupModel.findOne({ name: name }).then((result: any) => {
            if (result == null){
                return true;
            }
        });
        return false;
    }

    static checkUserExistence(participants: Array<string>){

        const userModel = require("../../Models/user.model");

        participants.forEach(participant=>{
            userModel.findOne({ email: participant }).then((result: any) => {
                if(result==null){
                    return false;
                }
                else{
                    console.log("Found ",result);
                }
            });
        });
        return true;
    }

    static getUserGroups(request: any, response: any, currentUserId: string){

        let userGroups=[];
        const userModel = require("../../Models/user.model");

        userModel.findOne({email: currentUserId}).populate("belongsTo").then((result: any)=>{
            console.log("result is ", result);
        }).catch((error: any)=>{
            console.log("error is ", error)
        });

        const respObj: ApiResponse<any> = {msg: "okay", data: null};
        response.status(204).send(respObj);

    }

    //append all participants' "belongsTo" field with group's ObjectId
    static updateUserGroups(groupId: string, userEmails: Array<string>){
        const userModel = require("../../Models/user.model");

        userEmails.forEach(userEmail=>{
            userModel.findOneAndUpdate({
                email : userEmail
            },
            {
                $push: { "belongsTo" : groupId }

            }).then(()=>{}).catch((error: any)=>{
                console.log("error is ",error);
            });
        });
        
    }
    
    static async createGroupService(request: any, response: any, creatorId: string){
        
        //check if all participants are valid and name of group does not exist in db
        if(this.checkGroupExistence(request.body.name) && this.checkUserExistence(request.body.participants)){
            const respObj: ApiResponse<any> = {msg: "Group creation error", data: null};
            response.status(409).send(respObj);
        }
        else{
            //fetch objectId for users
            let participantsId = request.body.participants;
            let group = require('../../Models/group.model');

            participantsId.push(creatorId);
            console.log(participantsId);

            //create object of mongoose.Schema
            const newGroup = new group({
                name: request.body.name,
                participants: participantsId,
                createdAt: new Date,
                updatedAt: new Date,
                createdBy: creatorId
            });
            
            //save newly created document in groups table
            newGroup.save().then(()=>{
                //update the participants' fields with this group id
                this.updateUserGroups(newGroup._id, participantsId);
                const resObj: ApiResponse<any> = { msg: 'Group created successfully.', data: null };
                response.status('201').send(resObj);
            }).catch((error: any) => {
                const resObj: ApiResponse<string> = { msg: 'Error creating group.', data: error };
                response.status('400').send(resObj);
            });
        }
    }
}