import { Document } from 'mongoose';
import { IAccount } from './account.interface';

export interface IUser extends Document {
  email: string;

  role: string;

  accounts: IAccount[];

  firstName: string;

  lastName: string;

  avatar: string;

  active: boolean;

  isValidPassword(plainText: string): Promise<boolean>;

  paginate(): Promise<[]>;
}
