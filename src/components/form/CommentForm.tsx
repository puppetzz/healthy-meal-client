"use client";

import { Button, Checkbox, Rating, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { CommentInputField } from "../../common/types/form/CommentInputField";

type CommentFormProps = {
  onSubmit: (values: CommentInputField) => void;
  isReply?: boolean;
};

export function CommentForm({
  onSubmit: handleSubmit,
  isReply = false,
}: CommentFormProps) {
  const [isCommentRating, setIsCommentRating] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      isReview: false,
      rating: 0,
    },
  });

  return (
    <div className="rounded-xl bg-[#f9fafb] p-4">
      <span className="text-lg font-semibold">Để lại bình luận của bạn</span>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="mt-4">
          <Textarea
            resize="vertical"
            label="Nội dung"
            placeholder="Chia sẻ suy nghĩ của bạn về công thức ở đây! Đánh giá bên dưới nếu bạn đã thực hiện công thức"
            minRows={3}
            required
            key={form.key("content")}
            {...form.getInputProps("content")}
          />
        </div>
        {!isReply && (
          <>
            <Checkbox
              className="mt-2"
              label="Tôi đã nấu món này"
              color="orange"
              onChange={(event) => {
                setIsCommentRating(event.target.checked);
                form.setValues({ isReview: event.target.checked });

                console.log();
                if (!event.target.checked) form.setValues({ rating: 0 });
              }}
              key={form.key("isReview")}
              checked={form.getValues().isReview}
            />

            <div className="mt-2 flex items-center">
              <span
                className={`mr-3 text-gray-600 ${!isCommentRating ? "text-gray-300" : ""}`}
              >
                Đánh giá công thức:{" "}
              </span>
              <Rating
                size="lg"
                readOnly={!isCommentRating}
                onChange={(value) => {
                  form.setValues({ rating: value });
                }}
                value={form.getValues().rating}
              />
            </div>
          </>
        )}

        <div className="mt-3 flex justify-end">
          <Button color="orange" type="submit">
            Đăng
          </Button>
        </div>
      </form>
    </div>
  );
}
