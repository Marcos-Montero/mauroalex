import { Suspense } from 'react';

import { SidebarMenu } from '@/app/components/sidebar-menu';

import { BlogEditor } from './components/blog-editor';
import { PromptMenu } from './components/prompt-menu';
import {
  getBlogEntries,
  getUserPrompts,
} from './data';

export default async function PublishPage() {
  const blogEntries = await getBlogEntries();
  const userPrompts = await getUserPrompts();

  const selectedPrompt = userPrompts.filter((prompt) => {
    return prompt.selected;
  })[0];
  /*   if (
    !(
      session?.user?.email === process.env.NEXT_PUBLIC_MAURO_MAIL ||
      session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_MAIL
    )
  ) {
    return;
  }
 */
  return (
    <div className="flex  bg-zinc-800 h-full">
      <SidebarMenu blogEntries={blogEntries} />
      <div className="flex flex-col gap-4 items-center  w-full p-8 ">
        <h1 className="text-3xl italic px-4 pl-2 py-2 self-start">New post</h1>
        <Suspense fallback={<h1>...loading prompts</h1>}>
          <PromptMenu
            availablePrompts={userPrompts}
            selectedPrompt={selectedPrompt}
          />
        </Suspense>
        <div className="flex flex-col gap-4 w-full">
          <BlogEditor selectedPrompt={selectedPrompt} />
        </div>
      </div>
    </div>
  );
}
