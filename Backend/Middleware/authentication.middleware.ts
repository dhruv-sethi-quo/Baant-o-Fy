const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { AuthService } from "../Services/Auth/auth.service";
const opts: any = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret key';

module.exports = new JwtStrategy(opts, (jwt_payload: any, done: any)=>{
    if(AuthService.checkExistence(jwt_payload.email)){
        return done(null,true);
    }
    else{
        return done(null, false);
    }
});