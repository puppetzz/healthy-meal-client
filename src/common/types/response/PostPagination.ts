import { Post } from "../post";

export type PostPagination = {
  data: Post[];
  page: number;
  total: number;
};
