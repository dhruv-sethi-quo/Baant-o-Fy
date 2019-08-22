import express, { response } from "express";
import { ApiController } from "../../Controllers/Api/api.controller";

const router = express.Router();

router.get('/getusergroups',(request:any, response: any)=>{
    return ApiController.getUserGroupsController(request, response);
});

router.post('/creategroup',(request, response)=>{
    return ApiController.createGroupController(request, response);
});

router.post('/createbill',(request, response)=>{
    return ApiController.createBillController(request, response);
});

router.post('/deletebill',(request, response)=>{
    return ApiController.deleteBillController(request, response);
});

router.get('/getuser',(request,response)=>{
    return ApiController.getUserDetailsController(request, response);
});

router.post('/changepassword',(request,response)=>{
    return ApiController.changeUserPasswordController(request,response);
});

router.get('/getdebts',(request,response)=>{
    return ApiController.getDebtsController(request, response);
});

export default router;