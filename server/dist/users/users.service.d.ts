import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    create(data: {
        email: string;
        password: string;
        name: string;
        role?: string;
    }): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
}
