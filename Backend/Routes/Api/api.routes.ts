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
    console.log("/deletebill called");
    console.log(request.body.id);
    return ApiController.deleteBillController(request, response);
});

export default router;