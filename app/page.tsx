import { Suspense } from "react";

import { CarouselBlogEntries } from "./components/carousel";
import { PubliWrapper } from "./components/publi";
import { SidebarMenu } from "./components/sidebar-menu";
import { getBlogEntries } from "./data";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { sb?: string };
}) {
  const blogEntries = await getBlogEntries();
  const isOpen = !!searchParams.sb;

  return (
    <div className="flex h-full">
      <div className="flex  bg-zinc-800">
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
