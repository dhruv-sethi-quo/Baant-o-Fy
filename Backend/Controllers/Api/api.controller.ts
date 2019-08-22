import { GroupService } from "../../Services/Api/group.service";
import jsonwebtoken from "jsonwebtoken";
import { BillService } from "../../Services/Api/bill.service";
import { UserService } from "../../Services/Api/user.service";
import { DebtService } from "../../Services/Api/debt.service";

export class ApiController{

    static fetchUserId(request: any){
        return jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'secret key');
    }

    static getUserGroupsController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return GroupService.getUserGroups(response, value._id);
    }

    static createGroupController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return GroupService.createGroupService(request, response, value.email);
    }

    static createBillController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return BillService.createBill(request, response, value.email);
    }

    static deleteBillController(request: any, response: any){
        return BillService.deleteBill(request, response);
    }

    static getUserDetailsController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return UserService.getUserDetails(value.email,response);
    }

    static changeUserPasswordController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return UserService.changeUserPassword(request, response, value.email);
    }

    static getDebtsController(request: any, response: any){
        let value: any= this.fetchUserId(request);
        return DebtService.getDebts(request,response,value.email);
    }
}