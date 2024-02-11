import React from "react";

import { Bg } from "@/components/bg";
import { LogButton } from "@/components/buttons";

const Landing = () => {
  return (
    <>
      <Bg className="absolute w-full h-full z-[1] text-red-600" />
      <main className="flex flex-col text-center justify-center align-center h-screen w-full bg-gradient-to-b from-zinc-700/90 to-zinc-900 p-2 min-w-fit">
        <h1 className="text-md md:text-3xl flex flex-col text-center md:gap-12  text-white  items-center outline-2 outline-red-600 z-[2]">
          Welcome to{" "}
        </h1>
        <div className="h-[50%] items-center bg-red flex justify-center w-full z-[2]">
          <LogButton className="bg-gradient-to-tr from-red-500 to-red-700 hover:to-red-600" />
        </div>
      </main>
    </>
  );
};

export default Landing;
