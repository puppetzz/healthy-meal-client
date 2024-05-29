"use client";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

type BlockNoteViewOnlyProps = {
  content: string;
};

export default function BlockNoteViewOnly({ content }: BlockNoteViewOnlyProps) {
  const data = content ? JSON.parse(content) : null;
  const editor = useCreateBlockNote({
    initialContent: data,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      theme="light"
      className="pe-0 ps-0"
    />
  );
}
