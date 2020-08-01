import { Document } from 'mongoose';
import { ERole } from './role.enum';

export interface IUser extends Document {
  email: string;

  password: string;

  roles: ERole[];

  firstName: string;

  lastName: string;

  avatar: string;

  active: boolean;

  isValidPassword(plainText: string): Promise<boolean>
}
