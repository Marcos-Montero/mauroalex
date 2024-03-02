"use client";

import { BlogEntry } from "@prisma/client";
import { mergeAttributes } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";

export const ReadOnlyBlog = ({
  content: { content },
}: {
  content: BlogEntry;
}) => {
  const htmlContent = useEditor({
    editable: false,
    content,
    extensions: [
      Document,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes = {
            1: "text-6xl font-bold mt-6 mb-12",
            2: "text-3xl",
            3: "text-2xl",
            4: "text-xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level as 1 | 2 | 3 | 4]}`,
            }),
            0,
          ];
        },
      }),
      Paragraph.configure({
        HTMLAttributes: { class: "text-md" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-xl size-32 my-8 w-full" },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-pink-700 ",
        },
      }),
      Youtube.configure({
        controls: true,
      }),
    ],
  });
  return (
    <>
      <EditorContent
        editor={htmlContent}
        className="h-64 w-full text-white px-8 "
      />
    </>
  );
};
