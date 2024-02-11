"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { BlogEntry } from "@prisma/client";

const variants = {
  open: {
    width: 296,
    transition: {
      type: "spring",
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
  closed: {
    width: "-50",
    transition: { type: "spring", duration: 0.5, staggerChildren: 0.1 },
  },
};
export const SidebarMenu = ({ blogEntries }: { blogEntries: BlogEntry[] }) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("sb") === "1";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            className="bg-zinc-900 h-full  px-4 overflow-hidden flex flex-col gap-8 py-4 z-[100000]"
          >
            <Link href="/" className="font-bold underline text-2xl ">
              Blog
            </Link>
            <ul
              className={
                "flex flex-col gap-2 items-center h-full pl-2 border-l"
              }
            >
              {blogEntries?.map((entry) => (
                <SidebarMenuLi
                  key={entry.id}
                  label={entry.title}
                  link={`/blog/${entry.id}`}
                />
              ))}
            </ul>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
const SidebarMenuLi = ({ label, link }: { label: string; link: string }) => {
  return (
    <li className="w-64 overflow-hidden text-ellipsis underline whitespace-nowrap">
      <Link href={link}>{label}</Link>
    </li>
  );
};
