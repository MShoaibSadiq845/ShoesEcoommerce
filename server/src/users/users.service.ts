import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    if (!email || typeof email !== 'string') {
      return null;
    }
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    if (!id) return null;
    return this.userModel.findById(id).exec();
  }

  async create(data: { email: string; password: string; name: string; role?: string }): Promise<UserDocument> {
    const user = new this.userModel({
      email: data.email ? data.email.toLowerCase() : '',
      password: data.password,
      name: data.name,
      role: data.role || 'user',
    });
    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }
}
