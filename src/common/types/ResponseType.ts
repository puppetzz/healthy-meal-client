export type ResponseType<T> = {
  data: T;
  message: string;
  status: number;
};
