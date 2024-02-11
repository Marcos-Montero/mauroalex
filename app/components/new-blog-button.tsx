import React from "react";

import { PencilIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { whitelist } from "@/lib/consts";

export const NewBlogButton = () => {
  const session = useSession();
  if (!whitelist.admin.has(session?.data?.user?.email || undefined)) {
    return;
  }
  return (
    <Link
      href="/blog/new"
      className="cursor-pointer flex items-center justify-center"
    >
      <PencilIcon className="w-6 h-6 text-white hover:scale-110 duration-300 cursor:pointer" />
    </Link>
  );
};
