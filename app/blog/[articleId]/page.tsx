import { Suspense } from "react";

import { PubliWrapper } from "@/app/components/publi";
import { SidebarMenu } from "@/app/components/sidebar-menu";
import { auth } from "@/lib/auth";
import { whitelist } from "@/lib/consts";

import { ReadOnlyBlog } from "./components/read-only-blog";
import { getArticleById, getBlogEntries } from "./data";

const ArticlePage = async ({
  params: { articleId },
}: {
  params: { articleId: string };
}) => {
  const blogEntry = await getArticleById(articleId);
  const blogEntries = await getBlogEntries();
  const session = await auth();
  const isAdmin = whitelist.admin.has(session?.user?.email || undefined);

  return (
    <div className="flex  bg-zinc-800 fh-full">
      <SidebarMenu blogEntries={blogEntries} isAdmin={isAdmin} />
      <PubliWrapper>
        <article className=" flex overflow-hidden overflow-y-scroll flex-col items-center h-full flex-1 ">
          <Suspense fallback={<h1>...loading blog entry</h1>}>
            {blogEntry && <ReadOnlyBlog content={blogEntry} />}
          </Suspense>
        </article>
      </PubliWrapper>
    </div>
  );
};
export default ArticlePage;
