import React from "react";

import Link from "next/link";

import Button from "./buttons";

const MauroLanding = () => {
  return (
    <main className="flex flex-col justify-center align-center w-full p-16">
      <div className="p-24 rounded-xl border-8 font-extrabold border-red-600 text-center ">
        <h1 className="text-[48px]">RESTRICTED AREA</h1>
        <p>This is an area only allowed for regular users</p>
        <Link href="/M/Pokedex">
          <Button>Go back home</Button>
        </Link>
      </div>
    </main>
  );
};

export default MauroLanding;
