"use client";

import { Rating } from "@mantine/core";
import { Comment } from "../../common/types/comment";
import dayjs from "dayjs";
import Image from "next/image";
import { CommentForm } from "../form/CommentForm";
import { useState } from "react";
import { usePostCommentMutation } from "../../mutation/usePostComment";
import { IconCornerUpLeft } from "@tabler/icons-react";

type CommentBlockProps = {
  comment: Comment;
  setIsReplyComment?: (value: boolean) => void;
  allowReply?: boolean;
};

export function CommentBlock({
  comment,
  setIsReplyComment,
  allowReply = true,
}: CommentBlockProps) {
  const [isReply, setIsReply] = useState<boolean>(false);

  const postCommentMutation = usePostCommentMutation();

  return (
    <div key={comment.id} className="mb-5 border-b-[1px] border-gray-300">
      <div className="flex items-center gap-2">
        <img
          src={comment.author.picture}
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <span className="text-lg font-semibold">{comment.author.fullName}</span>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="w-28">
          {!!comment.rating && <Rating readOnly value={comment.rating} />}
        </div>
        <span className="font-semibold text-gray-400">
          {dayjs(comment.createdAt).format("MMM DD, YYYY")}
        </span>
      </div>
      <p className={`mt-4 ${!allowReply ? "mb-3" : ""}`}>{comment.content}</p>
      {allowReply && (
        <div
          className="ml-5 flex cursor-pointer pb-4 pt-2"
          onClick={() => {
            setIsReply(true);
            setIsReplyComment && setIsReplyComment(true);
          }}
        >
          <IconCornerUpLeft className="h-6 w-6 pb-1 text-[#667085]" />
          <span className="pt-1 text-sm font-semibold text-[#667085] underline">
            Phản hồi
          </span>
        </div>
      )}

      {isReply && (
        <div>
          <div className="mb-5">
            <span className="text-xl font-semibold">{`Phản hồi ${comment.author.fullName}`}</span>
            <span
              className="ml-10 cursor-pointer font-semibold text-[#667085] underline"
              onClick={() => {
                setIsReply(false);
                setIsReplyComment && setIsReplyComment(false);
              }}
            >
              Huỷ phản hồi
            </span>
          </div>

          <CommentForm
            onSubmit={(values) => {
              postCommentMutation.mutate({
                postId: comment.postId,
                parentId: comment.id,
                content: values.content,
              });
            }}
            isReply={true}
          />
        </div>
      )}
    </div>
  );
}
