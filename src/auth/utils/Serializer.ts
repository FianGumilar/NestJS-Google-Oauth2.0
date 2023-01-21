import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../service/auth.service";
import { Injectable } from "@nestjs/common";
import { User } from "../models/user.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super();
    }

    serializeUser(user: User, done: Function) {
        console.log("serializeUser");
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        console.log("deserializeUser");
        const user = await this.authService.findUser(payload.id);
        return user ? done(null, user) : done(null, null);
    }
}