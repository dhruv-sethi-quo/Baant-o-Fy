import { AuthService } from "../../Services/Auth/auth.service";

export class AuthController{

    static signupController(request: any,response: any){
        return AuthService.signupService(request, response);
    }
    
    static loginController(request: any,response: any){
        return AuthService.loginService(request, response);
    }

    static forgotController(request: any,response: any){
        return AuthService.forgotService(request, response);
    }

}