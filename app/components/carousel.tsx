"use client";
import { useFormatEditor } from "@/hooks/useFormatEditor";
import { BlogEntry } from "@prisma/client";
import { EditorContent } from "@tiptap/react";

export const BlogCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const htmlContent = useFormatEditor({ content, editable: false });
  console.log({ cnt: htmlContent });
  return (
    <div className="max-w-xl  bg-zinc-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit">
      <div className="p-5">
        <EditorContent
          editor={htmlContent}
          className="line-clamp-6 text-ellipsis text-sm"
        />

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Leer más...
        </a>
      </div>
    </div>
  );
};
export const BlogEntriesCatalog = ({
  blogEntries,
}: {
  blogEntries: BlogEntry[];
}) => {
  return (
    <div className="flex-1 relative flex gap-4">
      {blogEntries.map(({ id, title, content }) => (
        <BlogCard key={id} title={title} content={content} />
      ))}
    </div>
  );
};
