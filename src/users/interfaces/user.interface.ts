import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;

  role: string;

  accounts: Record<string, any>[];

  firstName: string;

  lastName: string;

  avatar: string;

  active: boolean;

  isValidPassword(plainText: string): Promise<boolean>;

  paginate(): Promise<[]>;
}
