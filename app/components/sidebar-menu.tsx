"use client";
import { useTransition } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useToggle } from "react-use";

import Button from "@/components/buttons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BlogEntry } from "@prisma/client";

import { deleteArticle } from "../actions";
import { ConfirmationModal } from "./confirmation-modal";

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
export const SidebarMenu = ({
  blogEntries,
  isAdmin,
}: {
  blogEntries: BlogEntry[];
  isAdmin?: boolean;
}) => {
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
                  entryId={entry.id}
                  label={entry.title}
                  link={`/blog/${entry.id}`}
                  isAdmin={isAdmin}
                />
              ))}
            </ul>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
const SidebarMenuLi = ({
  entryId,
  label,
  link,
  isAdmin,
}: {
  entryId: string;
  label: string;
  link: string;
  isAdmin?: boolean;
}) => {
  const [isPending, startTrasition] = useTransition();
  const [isOpen, toggleOpen] = useToggle(false);
  const handleDelete = (articleId: string) =>
    startTrasition(async () => {
      try {
        await deleteArticle(articleId);
      } catch (error) {
        console.error({ error });
      }
    });

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        cancel={toggleOpen}
        question="Are you sure you want to delete this article?"
        action={() => handleDelete(entryId)}
      />
      <li className="w-64 overflow-hidden text-ellipsis underline whitespace-nowrap flex gap-2 items-center">
        {isAdmin && (
          <Button variant="ghost" className="p-0" onClick={toggleOpen}>
            <TrashIcon className="w-4 h-4 text-red-600" />
          </Button>
        )}
        <HoverCard>
          <HoverCardTrigger className="max-w-sm" asChild>
            <Link href={link} className="line-clamp-2">
              {label}
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit" side="right">
            {label}
          </HoverCardContent>
        </HoverCard>
      </li>
    </>
  );
};
