import { Suspense } from "react";

import { auth } from "@/lib/auth";
import { whitelist } from "@/lib/consts";

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
  const session = await auth();
  const isAdmin = whitelist.admin.has(session?.user?.email || undefined);
  return (
    <div className="flex h-full">
      <Suspense>
        <ErrorModal />
      </Suspense>
      <div className="flex  bg-zinc-950 w-full">
        <Suspense>
          <SidebarMenu blogEntries={blogEntries} isAdmin={isAdmin} />
        </Suspense>
        <PubliWrapper>
          <Suspense fallback={<h1>...loading blog entries</h1>}>
            <CarouselBlogEntries blogEntries={blogEntries} />
          </Suspense>
        </PubliWrapper>
      </div>
    </div>
  );
}
