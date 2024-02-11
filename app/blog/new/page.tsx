import { Suspense } from "react";

import { redirect } from "next/navigation";

import { SidebarMenu } from "@/app/components/sidebar-menu";
import { auth } from "@/lib/auth";
import { whitelist } from "@/lib/consts";

import { BlogEditor } from "./components/blog-editor";
import { PromptMenu } from "./components/prompt-menu";
import { getBlogEntries, getUserIdByEmail, getUserPrompts } from "./data";

export default async function PublishPage() {
  const session = await auth();
  const blogEntries = await getBlogEntries();
  const userPrompts = await getUserPrompts();

  const selectedPrompt = userPrompts.filter((prompt) => {
    return prompt.selected;
  })[0];
  if (!session || !session?.user?.email) {
    redirect("/api/auth/signin");
  }
  const isAdmin = whitelist.admin.has(session?.user?.email);
  const userId = await getUserIdByEmail(session?.user?.email);

  if (!isAdmin) redirect("/?error=unauthorized");

  return (
    <div className="flex  bg-zinc-800 h-full overflow-y-scroll">
      <Suspense>
        <SidebarMenu blogEntries={blogEntries} isAdmin={isAdmin} />
      </Suspense>
      <div className="flex flex-col gap-4 items-center  w-full p-8 ">
        <Suspense fallback={<h1>...loading prompts</h1>}>
          <PromptMenu
            availablePrompts={userPrompts}
            selectedPrompt={selectedPrompt}
            userId={userId}
          />
        </Suspense>
        <div className="flex flex-col gap-4 w-full">
          <Suspense>
            <BlogEditor />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
