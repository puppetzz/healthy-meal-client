"use client";
import { Comment } from "../../common/types/comment";
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
