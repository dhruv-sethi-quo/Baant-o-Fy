import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import { ApiResponse } from "../../Models/response.model";

export class AuthService {
    constructor() { }

    //checks if email id exists
    static checkExistence(email: string) {
        mongoose.connection.collection("users").findOne({ email: email }).then((result) => {
            if (result == null)
                return false;
        });
        return true;
    }

    //called when user makes a login request
    static loginService(request: any, response: any) {
        //fetch the user based on email id
        mongoose.connection.collection("users")
            .findOne({ email: request.body.email })
            .then((user) => {
                //converts mentioned parameter into a hash and compares it with
                //the hashed password stored in the database
                bcrypt.compare(request.body.password, user.password)
                .then((result)=>{
                    if(result){
                        //generate json web token for authenticating future calls
                        const token = jsonwebtoken.sign({
                            email: user.email,
                            _id: user._id
                        }, 'secret key' ,
                            {
                                expiresIn: '1h'
                            });
                        const resObj: ApiResponse<string> = { msg: 'Logged in successfully', data: token };
                        response.status('200').send(resObj);
                    }else{
                        const resObj: ApiResponse<any> = { msg: 'Invalid email or password.', data: null };
                        response.status('404').send(resObj);
                    }
                    
                })
                .catch((error)=>{
                    const resObj: ApiResponse<any> = { msg: 'Error comparing passwords.', data: null };
                    response.status('401').send(resObj);
                });
            })
            .catch((error) =>{
                const resObj: ApiResponse<any> = { msg: 'Invalid email or password.', data: null };
                response.status('404').send(resObj);
            });
                
    }
    //called when user makes a signup request
    static signupService(request: any, response: any) {
        //creates a hash out of the mentioned field
        bcrypt.hash(request.body.password, 10, (error, hash) => {
            if (error){
                const resObj: ApiResponse<any> = { msg: 'Encryption error', data: null };
                response.status('400').send(resObj);
            }
            else {
                //check if email id exists
                if (!this.checkExistence(request.body.email)){
                    const resObj: ApiResponse<any> = { msg: 'Email exists already.', data: null };
                    response.status('409').send(resObj);
                }

                //creates user since it does not exist
                else {
                    //get mongoose schema for user
                    var user = require("../../Models/user.model");
                    //define the document to be saved in the collection
                    const newUser = new user({
                        name: request.body.name,
                        email: request.body.email,
                        password: hash,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                    newUser.save().then((data: any) => {
                        const resObj: ApiResponse<any> = { msg: 'User created successfully.', data: null };
                        response.status('201').send(resObj);
                    }).catch((error: any) => {
                        const resObj: ApiResponse<string> = { msg: 'Error creating user.', data: error };
                        response.status('400').send(resObj);
                    });
                }
            }
        });
    }

    //called when user makes a forgot password request
    static forgotService(request: any, response: any) {
        
    }
}