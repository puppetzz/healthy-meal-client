export type CreateCommentRequest = {
  postId: number;
  parentId?: number;
  content: string;
  rating?: number;
};
