"use client";
import { PropsWithChildren } from "react";

import { useSearchParams } from "next/navigation";

export const PubliWrapper = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("sb") === "1";
  return (
    <div className="flex flex-col w-full h-full">
      <PubliTop />
      <div className="flex h-full w-full m-0">
        {!isOpen && <PubliLeft />}
        {children}
        {!isOpen && <PubliRight />}
      </div>
    </div>
  );
};

export const PubliTop = () => {
  return <div className="w-full h-32"></div>;
};
export const PubliLeft = () => {
  return <div className="hidden lg:block lg:w-[15%] h-full "></div>;
};
export const PubliRight = () => {
  return <div className="hidden lg:block lg:w-[15%] h-full "></div>;
};
