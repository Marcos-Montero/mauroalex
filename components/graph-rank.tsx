import Image from "next/image";

import { getDurationString } from "@/lib/utils";

import { ChartType } from "./basic-charts/basic-chart";
import { durationBasedExercises } from "./basic-charts/basic-chart-card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export const GraphRank = ({
  ranks,
  rank,
  division,
  selectedRank,
}: {
  ranks: { name: string; value: number }[];
  rank: string;
  division: string;
  selectedRank: ChartType;
}) => {
  return (
    <div className="rounded-br-xl  absolute top-0 left-0 w-fit bg-black/50  p-4  justify-center items-center flex flex-col gap-2 z-[5]">
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full shadow-[0_0_20px_rgba(255,255,255,.3)]">
              <Image
                src={`/${rank.toLocaleUpperCase()}.webp`}
                alt="rank image"
                width={100}
                height={100}
                className="w-12 h-12 "
              />
            </div>
            <div className="flex items-center justify-center ">
              <p className="italic text-white text-lg">
                {rank} {division}
              </p>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="bg-zinc-900/25 w-fit">
          {ranks.toReversed().map(({ name, value }) => (
            <ul key={name + value} className="flex flex-col gap-[-10px]">
              <li className="flex gap-2 my-[-2px] items-center">
                <p className="text-[10px] text-white">
                  {name} -{" "}
                  {durationBasedExercises.includes(selectedRank)
                    ? getDurationString(value)
                    : value}
                </p>
              </li>
            </ul>
          ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
