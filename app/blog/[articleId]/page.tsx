import { Suspense } from "react";

import { PubliWrapper } from "@/app/components/publi";
import { SidebarMenu } from "@/app/components/sidebar-menu";

import { ReadOnlyBlog } from "./components/read-only-blog";
import { getArticleById, getBlogEntries } from "./data";

const ArticlePage = async ({
  params: { articleId },
}: {
  params: { articleId: string };
}) => {
  const blogEntry = await getArticleById(articleId);
  const blogEntries = await getBlogEntries();

  return (
    <div className="flex  bg-zinc-800 h-full">
      <SidebarMenu blogEntries={blogEntries} />
      <PubliWrapper>
        <article className="lg:w-[50%] flex overflow-hidden overflow-y-scroll flex-col items-center h-full shadow-2xl bg-white/10">
          <Suspense fallback={<h1>...loading blog entry</h1>}>
            {blogEntry && <ReadOnlyBlog content={blogEntry} />}
          </Suspense>
        </article>
      </PubliWrapper>
    </div>
  );
};
export default ArticlePage;
