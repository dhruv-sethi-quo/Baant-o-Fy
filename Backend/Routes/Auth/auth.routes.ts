import express from "express";
import { AuthController }  from "../../Controllers/Auth/auth.controller";

const router = express.Router();

router.post('/signup',(request,response)=>{
    return AuthController.signupController(request,response);
});

router.post('/login',(request,response)=>{
    return AuthController.loginController(request,response);
});

router.post('/forgot',(request,response)=>{
    return AuthController.forgotController(request,response);
});

export default router;