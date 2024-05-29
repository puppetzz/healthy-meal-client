"use client";

import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../common/constants/queryKey";
import { getCommentByPostId } from "../api/comment";

export const useCommentByPostIdQuery = (postId: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_COMMENTS_BY_POST_ID, postId],
    queryFn: async () => {
      const data = await getCommentByPostId(postId);

      return data;
    },
  });
};
