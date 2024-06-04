"use client";

import { MealPlanComment } from "../../common/types/MealPlanComment";
import { CommentBlock } from "./CommentBlock";
import { MealPlanCommentBlock } from "./MealPlanCommnetBlock";

type MealPlanCommentViewProps = {
  comments: MealPlanComment[];
  setIsReplyComment: (value: boolean) => void;
};

export function MealPlanCommentView({
  comments,
  setIsReplyComment,
}: MealPlanCommentViewProps) {
  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div>
            <MealPlanCommentBlock
              comment={comment}
              setIsReplyComment={setIsReplyComment}
            />
            <div className="ml-5">
              {comment?.comment?.map((reply) => (
                <div key={reply.id}>
                  <MealPlanCommentBlock comment={reply} allowReply={false} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
