import { ApiService } from "../../Services/Api/api.service";
import jsonwebtoken from "jsonwebtoken";

export class ApiController{

    static fetchUserId(request: any){
        return jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'secret key');
    }

    static getUserGroupsController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return ApiService.getUserGroups(request, response, value.email);
    }

    static createGroupController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return ApiService.createGroupService(request, response, value.email);
    }
}