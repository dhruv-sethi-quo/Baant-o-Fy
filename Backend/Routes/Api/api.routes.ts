import express from "express";
import { ApiController } from "../../Controllers/Api/api.controller";

const router = express.Router();

router.get('/getusergroups',(request,response)=>{
    return ApiController.getUserGroupsController(request,response);
});

router.post('/creategroup',(request, response)=>{
    return ApiController.createGroupController(request, response);
});

export default router;