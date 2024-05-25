import { EPostStatus } from "../enums/PostStatus";
import { Recipe } from "./recipes";

export type Post = {
  id: number;
  authorId: number;
  parentId: number;
  title: string;
  content: string;
  rating: number;
  published: boolean;
  createAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  status: EPostStatus;
  recipe?: Recipe;
  thumbnail: string;
};
