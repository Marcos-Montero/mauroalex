"use client";
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Editor } from 'novel';

import Button from '@/components/buttons';
import { UserPrompts } from '@prisma/client';
import {
  Editor as EditorType,
  mergeAttributes,
} from '@tiptap/core';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Youtube from '@tiptap/extension-youtube';
import {
  type Content,
  useEditor,
} from '@tiptap/react';

import { createBlog } from '../../actions';

export const BlogEditor = ({
  selectedPrompt,
}: {
  selectedPrompt?: UserPrompts;
}) => {
  const [title, setTitle] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
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
      Paragraph,
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
      Image.configure({ HTMLAttributes: { class: "rounded-full size-32" } }),
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

  return (
    <>
      <Editor
        className="bg-black/40 border border-white rounded-xl min-h-64"
        onDebouncedUpdate={onType}
        disableLocalStorage
        defaultValue={{ type: "doc", content: [{ type: "paragraph" }] }}
      />
      <form action={createBlog}>
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="content" value={content} />
        <Button
          variant="ghost"
          type="submit"
          className="underline"
          onClick={() => replace("/")}
        >
          Save
        </Button>
      </form>
    </>
  );
};
