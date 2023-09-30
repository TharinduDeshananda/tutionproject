export default class PageResponse<T> {
  public data: T;
  public page: number;
  public totalPages: number;
  public size: number;
  public total: number;
}
