import { Suspense } from "react";

import { HexIcon } from "@/components/hexIcon";
import { auth } from "@/lib/auth";
import { whitelist } from "@/lib/consts";

import { BlogEntriesCatalog } from "./components/carousel";
import { ErrorModal } from "./components/error-modal";
import { PubliWrapper } from "./components/publi";
import { SidebarMenu } from "./components/sidebar-menu";
import { getBlogEntries } from "./data";

export default async function BlogPage() {
  const blogEntries = await getBlogEntries();
  const session = await auth();
  const isAdmin = whitelist.admin.has(session?.user?.email || undefined);
  return (
    <div className="flex h-full">
      <Suspense>
        <ErrorModal />
      </Suspense>
      <div className="flex bg-zinc-800 w-full">
        <Suspense>
          <SidebarMenu blogEntries={blogEntries} isAdmin={isAdmin} />
        </Suspense>
        <PubliWrapper>
          <div className="flex flex-col items-center gap-8 pb-8">
            <Suspense fallback={<h1>...loading blog entries</h1>}>
              <BlogEntriesCatalog blogEntries={blogEntries} />
            </Suspense>
            <div className="relative h-36 w-36 pb-8">
              <HexIcon className="h-36 w-36 absolute fill-white/70" />
            </div>
          </div>
        </PubliWrapper>
      </div>
    </div>
  );
}
