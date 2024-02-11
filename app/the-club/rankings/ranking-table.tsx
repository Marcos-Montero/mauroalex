import { Suspense } from "react";

import Image from "next/image";

import MauroCheck from "@/components/MauroCheck";
import Spinner from "@/components/spinner";
import { getDurationString } from "@/lib/utils";

import { TriggerDeleteRankingDialog } from "./delete-ranking-dialog";
import { RankingWithDetails } from "./page";

export const RankingTable = async ({
  ranking,
}: {
  ranking: RankingWithDetails;
}) => {
  const { id, title, measures } = ranking;
  const entries = ranking.rankingEntries;
  const formatedEntries = entries.map((entry) => ({
    id: entry.id,
    userImage: entry.user.image,
    userNickname: entry.user.nickname,
    userName: entry.user.name,
    values: entry.values.map((value) => ({
      id: value.id,
      measureId: value.measureId,
      value: value.value,
    })),
    total: entry.values.reduce((acc, curr) => acc + curr.value, 0),
  }));
  const with0workout = formatedEntries
    .filter(({ values }) => values.filter((v) => v.value > 0).length === 0)
    .sort((a, b) => {
      return a.total - b.total;
    });
  const with1workout = formatedEntries
    .filter(({ values }) => values.filter((v) => v.value > 0).length === 1)
    .sort((a, b) => {
      return a.total - b.total;
    });
  const with2workout = formatedEntries
    .filter(({ values }) => values.filter((v) => v.value > 0).length === 2)
    .sort((a, b) => {
      return a.total - b.total;
    });
  const sortedEntries = [...with2workout, ...with1workout, ...with0workout];

  if (!id || !title || !entries) return;
  return (
    <div className="flex flex-col items-center mb-8 gap-4  outline outline-white/20 p-2 rounded-xl">
      <div
        className="flex flex-col items-center justify-center gap-2 w-full outline outline-white/10 p-2 rounded-xl"
        key={id}
      >
        <span className="text-center w-full justify-center flex text-2xl font-bold">
          {ranking.title}
        </span>
        <Suspense fallback={<Spinner />}>
          <table className="border border-white p-2 rounded-sm border-collapse overflow-hidden w-full text-center">
            <thead>
              <tr>
                <th className="bg-white/20 text-center" key={title}>
                  User
                </th>
                {measures.map((measure) => (
                  <th key={measure.id} className="bg-white/20 text-center">
                    {measure.name}
                  </th>
                ))}

                <th className="bg-white/20 text-center" key={title + "total"}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry) => {
                if (entry.values.filter((v) => v.value > 0).length === 0) {
                  return;
                }
                return (
                  <tr key={id + entry.id}>
                    <td className="border-b border-white p-2 rounded-sm">
                      <div className="flex items-center gap-2 justify-center">
                        {entry.userImage && (
                          <Image
                            src={entry.userImage}
                            alt={`${entry.userName}'s profile picture`}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        )}
                        <p className=" hidden sm:block">
                          {entry.userNickname
                            ? entry.userNickname
                            : entry.userName}
                        </p>
                      </div>
                    </td>
                    {entry.values.map((value) => {
                      const measure = measures.find(
                        (m) => m.id === value.measureId
                      );
                      if (!measure) return null;
                      return (
                        <td
                          key={value.id}
                          className="border-b border-white p-2 rounded-sm"
                        >
                          {value && measure && (
                            <span>{getDurationString(value.value)}</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="border-b border-white p-2 rounded-sm">
                      {getDurationString(entry.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {sortedEntries.length === 0 && (
            <div className="flex items-center gap-2 justify-center">
              <p className="text-center w-full justify-center flex text-xl font-bold italic text-white/70">
                No entries yet
              </p>
            </div>
          )}
        </Suspense>
      </div>
      <MauroCheck noLanding>
        <TriggerDeleteRankingDialog title={title} id={ranking.id} />
      </MauroCheck>
    </div>
  );
};
