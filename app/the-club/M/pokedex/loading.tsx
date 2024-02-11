import React from "react";

import { v4 as uuid } from "uuid";

import Button from "@/components/buttons";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingUsers = () => {
  return (
    <main className="flex flex-col sm:ml-[60px] sm:pb-0 pb-[60px] w-full">
      <h1 className="text-3xl text-center w-full p-8">My Pokemons</h1>
      <div className="w-full flex items-center justify-evenly gap-2 ">
        <Button
          variant="ghost"
          className="flex flex-1 border-b border-b-white rounded-none hover:bg-transparent hover:text-white hover:bg-gradient-to-t hover:from-white/25 hover:to-transparent"
        >
          Name
        </Button>
        <Button
          variant="ghost"
          className="flex flex-1 border-b border-b-white rounded-none hover:bg-transparent hover:text-white hover:bg-gradient-to-t hover:from-white/25 hover:to-transparent"
        >
          Weight
        </Button>
        <Button
          variant="ghost"
          className="flex flex-1 border-b border-b-white rounded-none hover:bg-transparent hover:text-white hover:bg-gradient-to-t hover:from-white/25 hover:to-transparent"
        >
          Workout
        </Button>
      </div>
      <ul className="flex flex-col gap-2 p-2 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={uuid()}
            className="w-full flex items-center justify-start gap-2"
          >
            <div className="underline flex items-center w-full gap-2">
              <Skeleton className="rounded-full h-[20px] w-[20px]" />
              <Skeleton className="h-8 w-full" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default LoadingUsers;
