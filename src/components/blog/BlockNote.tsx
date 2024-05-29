"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useUploadFile } from "../../hooks/useUploadFile";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { POST_CONTENT_LOCAL_STORAGE_KEY } from "../../common/constants/general";
import { useCallback, useEffect, useMemo, useState } from "react";

type BlockNoteProps = {
  className?: string;
};

export default function BlockNote({ className }: BlockNoteProps) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const uploadFile = useUploadFile();

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent, uploadFile: uploadFile });
  }, [initialContent]);

  const saveToLocalStorage = useCallback((jsonBlocks: Block[]) => {
    localStorage.setItem(
      POST_CONTENT_LOCAL_STORAGE_KEY,
      JSON.stringify(jsonBlocks),
    );
  }, []);

  const loadFromStorage = useCallback(async () => {
    const storageString = localStorage.getItem(POST_CONTENT_LOCAL_STORAGE_KEY);
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  }, []);

  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <BlockNoteView
      className={className}
      editor={editor}
      theme="light"
      onChange={() => {
        saveToLocalStorage(editor.document);
      }}
    />
  );
}
