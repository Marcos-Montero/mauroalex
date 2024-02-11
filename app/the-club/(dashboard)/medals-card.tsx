"use client";
import Image from "next/image";

import { ChartType, ranks } from "@/components/basic-charts/basic-chart";
import {
  durationBasedExercises,
  durationReversedExercises,
} from "@/components/basic-charts/basic-chart-card";
import { getDurationString, getRank } from "@/lib/utils";

import { UserWithDetails } from "./dashboard";

export const Medalscard = ({
  userWithDetails,
}: {
  userWithDetails: UserWithDetails;
}) => {
  const rawRecords = userWithDetails?.records?.reduce(
    (
      acc: Record<string, { mark: number; timestamp: Date }>,
      { basicExercise: { name }, timestamp, mark }
    ) => {
      if (!acc[name] || acc[name].timestamp < timestamp) {
        acc[name] = { mark, timestamp };
      }
      return acc;
    },
    {}
  );
  const userRecords = rawRecords
    ? Object.entries(rawRecords).map(([name, { mark }]) => ({ name, mark }))
    : [];

  return (
    <div className="sm:outline sm:outline-white/10 text-center  p-2 sm:p-4 rounded-xl flex flex-col items-center gap-4 w-fit  min-w-fit flex-wrap justify-evenly outline outline-white/20">
      {userRecords?.map((record) => {
        const exerciseName = record.name;
        const { rank, division } = getRank(
          record.mark,
          ranks[exerciseName.replace(" ", "") as ChartType],
          durationReversedExercises.includes(record.name)
        );
        return (
          <div
            key={exerciseName}
            className="flex gap-2  w-64 sm:w-96 bg-gradient-to-br from-zinc-400/20 to-zinc-800/50 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-300"
          >
            <div className="flex justify-evenly items-center w-full  gap-2">
              <div className="flex gap-2 items-center flex-col sm:flex-row flex-1">
                <span className="text-[12px] sm:text-sm font-bold">
                  {exerciseName}
                </span>

                <span className="text-[12px] sm:text-sm">
                  (
                  {durationBasedExercises.includes(
                    exerciseName.replace(" ", "")
                  )
                    ? getDurationString(record.mark) + " "
                    : " " + record.mark + " reps "}
                  )
                </span>
              </div>
              <div className="flex flex-col  items-center flex-1">
                <Image
                  src={`/${rank?.toLocaleUpperCase()}.webp`}
                  alt="rank image"
                  width={20}
                  height={20}
                  className="w-8 h-8 sm:w-6 sm:h-6"
                />
                <p className="italic text-white/50">
                  {rank} {division}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
