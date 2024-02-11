"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { defaultUserAvatar } from "@/consts";

import { AuthCheck } from "./AuthCheck";
import { LogButton } from "./buttons";
import { NavMenu } from "./nav-menu";

export const NavClub = () => {
  const { data } = useSession();
  return (
    <AuthCheck noLanding>
      <nav className="sm:relative flex w-screen z-[10] h-fit fixed bottom-0 left-0 sm:flex-col sm:h-screen sm:w-fit  justify-between bg-black p-2 sm:pt-16 items-center">
        <Image
          src={data?.user?.image ?? defaultUserAvatar}
          alt="user profile picture"
          width={32}
          height={32}
          className={`rounded-full hidden sm:block`}
        ></Image>
        <NavMenu />
        <LogButton variant="ghost" className="hidden sm:flex" />
      </nav>
    </AuthCheck>
  );
};
