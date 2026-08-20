import { AuthService } from './auth.service';
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    }>;
    login(body: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    }>;
    getMe(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
    }>;
}
