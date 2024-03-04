"use client";

import { useFormatEditor } from "@/hooks/useFormatEditor";
import { BlogEntry } from "@prisma/client";
import { EditorContent } from "@tiptap/react";

export const ReadOnlyBlog = ({
  content: { content },
}: {
  content: BlogEntry;
}) => {
  const htmlContent = useFormatEditor({
    editable: false,
    content,
  });
  return (
    <>
      <EditorContent
        editor={htmlContent}
        className="h-64 w-full text-white px-8 animate-fade-in"
      />
    </>
  );
};
