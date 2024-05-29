"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentRequest } from "../common/types/request/comments/CreateComment";
import { createComment } from "../api/comment";
import { QueryKey } from "../common/constants/queryKey";
import { ResponseType } from "../common/types";
import { Comment } from "../common/types/comment";

export const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: async (createCommentRequest: CreateCommentRequest) => {
      const response = await createComment(createCommentRequest);

      return response;
    },
    onSuccess: (data: ResponseType<Comment>) => {
      queryClient.refetchQueries({
        queryKey: [QueryKey.GET_COMMENTS_BY_POST_ID, data.data.postId],
      });
    },
  });
};
