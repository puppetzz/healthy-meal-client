"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";

type BlockNoteProps = {
  initialContent?: string;
};

export const BlockNote = ({ initialContent }: BlockNoteProps) => {
  const initial = initialContent ? JSON.parse(initialContent) : null;
  const editor = useCreateBlockNote({ initialContent: initial });

  return <BlockNoteView editor={editor} theme="light" />;
};
