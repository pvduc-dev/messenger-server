import { Model, mquery } from 'mongoose';

export interface IModel<T> extends Model<any> {
  paginate(query?: unknown, options?: unknown): Promise<any>
}
