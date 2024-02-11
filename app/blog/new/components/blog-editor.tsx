"use client";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { Editor } from "novel";
import { useToggle } from "react-use";

import { ConfirmationModal } from "@/app/components/confirmation-modal";
import { Editor as EditorType, mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Youtube from "@tiptap/extension-youtube";
import { type Content, useEditor } from "@tiptap/react";

import { createBlog } from "../../actions";

export const BlogEditor = () => {
  const [title, setTitle] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [isOpen, toggleOpen] = useToggle(false);
  const [isPending, startTransition] = useTransition();

  const { replace } = useRouter();
  const htmlContent = useEditor({
    editable: false,
    content: "<h1></h1><p></p>",
    extensions: [
      Document,
      Text,
      BulletList,
      ListItem,
      CodeBlock,
      HardBreak,
      HorizontalRule,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes = {
            1: "text-4xl",
            2: "text-2xl",
            3: "text-xl",
            4: "text-lg",
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

  const onType = (editor?: EditorType) => {
    if (!htmlContent || !editor) return;
    htmlContent?.commands.setContent(editor.getHTML() as Content);
    setTitle(htmlContent?.getJSON().content?.[0]?.content?.[0]?.text);
    setContent(htmlContent?.getHTML());
  };
  const handleCreate = ({
    title,
    content,
  }: {
    title?: string;
    content?: string;
  }) =>
    startTransition(async () => {
      try {
        await createBlog({ title, content });
      } catch (error) {
        console.error({ error });
      }
    });

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        cancel={toggleOpen}
        question="Save and create the article ?"
        action={() => handleCreate({ title, content })}
      />
      <Editor
        className="bg-black/40 border border-white rounded-xl min-h-64 max-h-full overflow-y-scroll"
        onDebouncedUpdate={onType}
        disableLocalStorage
        defaultValue={{ type: "doc", content: [{ type: "paragraph" }] }}
      />

      <button
        type="submit"
        className="fixed bottom-6 right-6 outline outline-orange-400 rounded-md p-2"
        onClick={toggleOpen}
      >
        Save
      </button>
    </>
  );
};
