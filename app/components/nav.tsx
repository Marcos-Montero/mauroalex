"use client";
import { MenuIcon } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button, { LogButton } from "@/components/buttons";
import HanmaIcon from "@/components/hanma-icon";
import { cn } from "@/lib/utils";

import { Rubik_Mono_One } from "../fonts";
import { NewBlogButton } from "./new-blog-button";

export const Nav = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOpen = () => {
    const newSP = new URLSearchParams(searchParams);
    if (searchParams?.get("sb") === "1") {
      newSP.delete("sb");
    } else {
      newSP.append("sb", "1");
    }
    replace(`${pathname}?${newSP.toString()}`);
  };
  const isOpen = !!searchParams.get("sb");

  return (
    <>
      <SessionProvider>
        <div className="flex w-screen bg-black/50 px-8 border-b border-white/10  items-center py-2">
          <div className="flex gap-4">
            <div className="relative">
              <Link href="/">
                <div className="flex justify-center items-center rounded-full overflow-hidden h-8 w-8 border-2 border-white hover:scale-110 duration-300">
                  <Image
                    src="/logo-ma.jpeg"
                    alt="logo-mauro-blog"
                    width={50}
                    height={50}
                  />
                </div>
              </Link>
            </div>
            <button onClick={handleOpen}>
              <MenuIcon
                className={cn(
                  "w-8 h-8 text-white hover:scale-110 duration-300",
                  isOpen && "-skew-x-[15deg]"
                )}
              />
            </button>
            <NewBlogButton />
          </div>

          <div className="grow flex justify-center items-center self-center">
            <Link href="/">
              <h3 className="text-2xl hover:scale-110 duration-300  hidden md:block">
                MAURO ALEX
              </h3>
              <h3 className="text-2xl hover:scale-110 duration-300 md:hidden">
                MA
              </h3>
            </Link>
          </div>
          <div className="flex gap-4 self-end ">
            <Button
              className={cn(
                "flex gap-2 tracking-tighter rounded-md before:ease relative overflow-hidden bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-2xl transition-all before:absolute before:-right-32 before:-top-12 before:h-32 before:w-32 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-20 before:duration-700 hover:before:-translate-x-96 hover:brightness-125 before:blur-sm px-4 items-center",
                Rubik_Mono_One.className
              )}
              asChild
            >
              <Link href="/club">
                <HanmaIcon />
                <p className="hidden md:block">THE CLUB</p>
              </Link>
            </Button>

            {/*             <button>
              <UserIcon className="w-8 h-8 text-white hover:scale-110 duration-300" />
            </button> */}
            <LogButton className=" w-8 h-8 p-0 text-white hover:scale-110 duration-300 self-center" />
          </div>
        </div>
      </SessionProvider>
    </>
  );
};
