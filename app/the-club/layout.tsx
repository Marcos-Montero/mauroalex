import React, { PropsWithChildren } from "react";

import { Bg } from "@/components/bg";
import { NavClub } from "@/components/navClub";

const TheClubLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavClub />
      <Bg className="absolute w-full h-full z-[-1] opacity-50" />

      {children}
    </>
  );
};
export default TheClubLayout;
