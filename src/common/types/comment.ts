import { User } from "./User";

export type Comment = {
  id: number;
  postId: number;
  parentId: number | null;
  authorId: string;
  content: string;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  comment?: Comment[];
};
