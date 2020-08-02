export interface IPage<T> {
  page: number;
  size: number;
  records: T[];
}
