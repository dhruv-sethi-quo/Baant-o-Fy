import { ApiResponse } from "../../Models/response.model";
import * as bcrypt from "bcrypt";

export class UserService{

    static async getUser(objectId: String){
        const userModel = require("../../Models/user.model");
        return await userModel.findOne({_id: objectId}, "name email -_id");
    }

    static getUserDetails(userEmail: String, response: any){
        const userModel = require("../../Models/user.model");
        userModel.find({email: userEmail}, "-_id -password -updatedAt").then((result: any)=>{
            const respObj: ApiResponse<String> = {msg: "User fetched successfully", data: result};
            response.status(200).send(respObj);
        }).catch((error: any)=>{
            const respObj: ApiResponse<String> = {msg: "Error fetching user", data: error};
            response.status(400).send(respObj);
        });
    }

    static async getUserbyEmail(email: String){
        const userModel = require("../../Models/user.model");
        return await userModel.findOne({email: email}, "name email -_id");
    }
    
    static checkUserExistence(participants: Array<string>){
        console.log("checkUserExistence called");
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

    static changeUserPassword(request:any, response: any, user: String){
        let userModel = require("../../Models/user.model");
        console.log(request.body);

        userModel.findOne({email: user}).then((result: any)=>{
            
            bcrypt.compare(request.body.currentPassword,result.password)
            .then(()=>{
                bcrypt.hash(request.body.newPassword,10,(error,hash)=>{
                    if(error){
                        const respObj: ApiResponse<any> = {msg: "Encryption error!", data: error};
                        response.status(400).send(respObj);
                    }
                    else{
                        userModel.findOneAndUpdate({email: user},{password: hash}).then(()=>{
                            const respObj: ApiResponse<any> = {msg: "Password changed successfully!", data: null};
                            response.status(200).send(respObj);
                        }).catch((error: any)=>{
                            const respObj: ApiResponse<any> = {msg: "Error saving password!", data: error};
                            response.status(409).send(respObj);
                        });
                    }
                });
            })
            .catch((error: any)=>{
                const respObj: ApiResponse<String> = {msg: "Passwords do not match!", data: error};
                response.status(401).send(respObj);
            });

        }).catch((error: any)=>{
            const respObj: ApiResponse<String> = {msg: "Error fetching user!", data: error};
            response.status(404).send(respObj);
        });
    }

    //get ObjectId for each email id of user
    static async getUserIds(emailIds: Array<String>){
        let objectIds: any=[];
        let user = require("../../Models/user.model");
        try{
            for(let iterator=0;iterator<emailIds.length;iterator++){
                let result = await user.findOne({email: emailIds[iterator]});
                objectIds.push(result._id);
            }
            return objectIds;
        }
        catch(error){
            console.log("error",error);
        }
    }
}