import { EPostStatus } from "../enums/PostStatus";
import { Recipe } from "./recipes";
import { User } from "./User";

export type Post = {
  id: number;
  authorId: string;
  parentId: number;
  title: string;
  content: string;
  rating: number;
  numberOfComments?: number;
  numberOfReviews?: number;
  published: boolean;
  createAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  status: EPostStatus;
  recipe?: Recipe;
  thumbnail: string;
  author?: User;
};
