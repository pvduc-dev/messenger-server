import { Document } from 'mongoose';

export interface IAccount extends Document {
  kind: string;
  password?: string;
  id?: string;
  accessToken?: string;
}
