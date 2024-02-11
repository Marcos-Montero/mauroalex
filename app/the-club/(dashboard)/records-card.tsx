import { getSession } from "next-auth/react";

import { prisma } from "@/lib/prisma";
import { getDurationString } from "@/lib/utils";
import {
  Measure,
  Ranking,
  RankingEntry,
  RankingEntryValue,
} from "@prisma/client";

import TriggerAddRankingEntryPanel from "./add-ranking-entry-panel";

export type RankingEntriesWithRankingAndValues = (RankingEntry & {
  ranking: Ranking & {
    measures: Measure[];
  };
  values: RankingEntryValue[];
})[];
const RecordsCard = async () => {
  const session = await getSession();
  const userRankingEntries = await prisma.rankingEntry.findMany({
    where: {
      user: {
        email: session?.user?.email!,
      },
    },
    include: {
      ranking: {
        include: {
          measures: true,
        },
      },
      values: true,
    },
  });
  const availableRankings = await prisma.ranking.findMany({
    include: {
      measures: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return (
    <div className="flex flex-col gap-4 backdrop-blur-xl  bg-gradient-to-tr from-white/5 via-indigo-500/5  text-white p-4 rounded-lg shadow-lg min-w-fit h-fit ">
      <div className="flex flex-col gap-4">
        <div className="overflow-auto outline outline-white/10 p-2 rounded-xl flex flex-col gap-2">
          {userRankingEntries?.map(({ ranking, userId, values }) => (
            <div key={ranking.id}>
              <span className="text-center w-full justify-center flex text-2xl font-bold">
                {ranking.title}
              </span>
              <table className="w-full text-center">
                <thead>
                  <tr>
                    {ranking?.measures?.map((measure) => (
                      <th key={measure.id} className="bg-white/10">
                        {measure.name}
                      </th>
                    ))}
                    <th className="bg-white/40">total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {ranking?.measures?.map((measure) => (
                      <td
                        key={measure.id + ranking.id + userId}
                        className="border-b border-white/25 p-2 rounded-sm"
                      >
                        {getDurationString(
                          values.find((value) => value.measureId === measure.id)
                            ?.value
                        )}
                      </td>
                    ))}
                    <td>
                      {getDurationString(
                        values.reduce((acc, curr) => acc + curr.value, 0)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <div className="w-full justify-center flex">
            <TriggerAddRankingEntryPanel
              availableRankings={availableRankings}
              userRankingEntries={userRankingEntries}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsCard;
