import { TrophyIcon } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";

import Landing from "@/app/the-club/landing";
import { AuthCheckRedirect } from "@/components/AuthCheck";
import MauroCheck from "@/components/MauroCheck";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { prisma } from "@/lib/prisma";

import TriggerAddTrophypanel from "./add-trophies-panel";
import { TriggerDeleteRankingDialog } from "./delete-trophy-dialog";

export default async function Trophies() {
  const session = await getSession();
  if (!session) {
    return <Landing />;
  }
  const trophies = await prisma.trophy.findMany();
  return (
    <AuthCheckRedirect>
      <MauroCheck>
        <main className="flex flex-col sm:ml-[60px] sm:pb-0 pb-[60px] w-full items-center gap-4">
          <h1 className="text-3xl text-center w-full p-8">Trophies</h1>
          <div className="flex flex-col gap-4 py-4 p-4 outline outline-white/20 rounded-xl">
            {trophies.map((trophy) => (
              <div
                className="flex gap-2 items-center w-96 justify-between p-4 outline outline-white/40 rounded-xl"
                key={trophy.id}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      <TrophyIcon className="w-6 h-6" />
                      <Link href={`/M/trophies/${trophy.id}`}>
                        <h2>{trophy.name}</h2>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 text-white">
                      <h2 className="text-xl font-bold">{trophy.name}</h2>
                      <p>{trophy.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TriggerDeleteRankingDialog trophy={trophy} />
              </div>
            ))}
          </div>
          <TriggerAddTrophypanel />
        </main>
      </MauroCheck>
    </AuthCheckRedirect>
  );
}
