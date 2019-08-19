export class UserService{

    static async getUser(objectId: String){
        const userModel = require("../../Models/user.model");
        return await userModel.findOne({_id: objectId}, "name email -_id");
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