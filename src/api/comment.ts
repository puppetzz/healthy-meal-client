import { API } from "../common/constants/api";
import { ResponseType } from "../common/types";
import { Comment } from "../common/types/comment";
import { CreateCommentRequest } from "../common/types/request/comments/CreateComment";
import axiosClient from "../lib/axiosClient";

export const getCommentByPostId = async (
  postId: number,
): Promise<ResponseType<Comment[]>> => {
  const response = await axiosClient<ResponseType<Comment[]>>({
    url: `${API.COMMENTS}/post/${postId}`,
    method: "GET",
  });

  return response.data;
};

export const createComment = async (
  createCommentRequest: CreateCommentRequest,
): Promise<ResponseType<Comment>> => {
  const response = await axiosClient<ResponseType<Comment>>({
    url: API.COMMENTS,
    method: "POST",
    data: createCommentRequest,
  });

  return response.data;
};
