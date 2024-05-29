"use client";
import { Rating } from "@mantine/core";
import { Comment } from "../../common/types/comment";
import dayjs from "dayjs";
import Image from "next/image";
import { CommentForm } from "../form/CommentForm";
import { useState } from "react";
import { CommentInputField } from "../../common/types/form/CommentInputField";
import { usePostCommentMutation } from "../../mutation/usePostComment";
import { CommentBlock } from "./CommentBlock";

type CommentProps = {
  comments: Comment[];
  setIsReplyComment: (value: boolean) => void;
};

export function CommentView({ comments, setIsReplyComment }: CommentProps) {
  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div>
            <CommentBlock
              comment={comment}
              setIsReplyComment={setIsReplyComment}
            />
            <div className="ml-5">
              {comment?.comment?.map((reply) => (
                <div key={reply.id}>
                  <CommentBlock comment={reply} allowReply={false} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
