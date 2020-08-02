import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;

  password: string;

  role: string;

  firstName: string;

  lastName: string;

  avatar: string;

  active: boolean;

  isValidPassword(plainText: string): Promise<boolean>;

  paginate(): Promise<[]>;
}
