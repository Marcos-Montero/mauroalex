import { Suspense } from "react";

import { CarouselBlogEntries } from "./components/carousel";
import { ErrorModal } from "./components/error-modal";
import { PubliWrapper } from "./components/publi";
import { SidebarMenu } from "./components/sidebar-menu";
import { getBlogEntries } from "./data";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { sb?: string; errror?: string };
}) {
  const blogEntries = await getBlogEntries();
  return (
    <div className="flex h-full">
      <ErrorModal />
      <div className="flex  bg-zinc-950">
        <SidebarMenu blogEntries={blogEntries} />
        <PubliWrapper>
          <Suspense fallback={<h1>...loading blog entries</h1>}>
            <CarouselBlogEntries blogEntries={blogEntries} />
          </Suspense>
        </PubliWrapper>
      </div>
    </div>
  );
}
