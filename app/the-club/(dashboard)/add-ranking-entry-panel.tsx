"use client";

import { ChangeEvent, useState } from "react";

import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { DurationInput } from "@/components/DurationInput";
import { useModal } from "@/context/ModalContext";
import { Measure, Ranking } from "@prisma/client";

import { RankingEntriesWithRankingAndValues } from "./records-card";

type RankingWithMeasures = Ranking & { measures: Omit<Measure, "rankingId">[] };
const AddRankingEntryPanel = ({
  availableRankings,
  userRankingEntries,
}: {
  availableRankings: RankingWithMeasures[];
  userRankingEntries: RankingEntriesWithRankingAndValues;
}) => {
  const [selectedRanking, setSelectedRanking] = useState<RankingWithMeasures>(
    availableRankings[0]
  );
  const [availableMeasures, setAvailableMeasures] = useState<
    { id: string; name: string; value: number }[]
  >(
    availableRankings[0].measures.map(({ name, id }) => ({
      id,
      name,
      value: 0,
    }))
  );
  const { setContent } = useModal();
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const router = useRouter();
  const handleRankingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const ranking = availableRankings.find(({ id }) => id === e.target.value)!;
    setSelectedRanking(ranking);
    setAvailableMeasures(
      ranking.measures.map(({ name, id }) => ({ id, name, value: 0 }))
    );
  };

  const handleDurationChange = (value: number, measureId: string) => {
    const newMeasures = [...availableMeasures];
    const index = newMeasures.findIndex(({ id }) => id === measureId);
    newMeasures[index].value = value;
    setAvailableMeasures(newMeasures);
  };
  const updateUser = async () => {
    setLoading(true);
    const body = {
      measures: availableMeasures,
      rankingId: selectedRanking.id,
    };
    const res = await fetch("/api/ranking/entry", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContent(null);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <select className="bg-white/10" onChange={handleRankingChange}>
        {availableRankings.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-2 justify-center items-center relative">
        {availableMeasures.map(({ name, id }, i) => (
          <div key={name + i} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <h3>{name}</h3>
              <DurationInput
                onChange={(value) => handleDurationChange(value, id)}
                defaultValue={
                  userRankingEntries
                    ?.find(({ rankingId }) => rankingId === selectedRanking.id)
                    ?.values?.find(({ measureId }) => measureId === id)
                    ?.value || 0
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-between items-center relative w-fit">
        <Button variant="outline" onClick={updateUser} disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const TriggerAddRankingEntryPanel = ({
  availableRankings,
  userRankingEntries,
}: {
  availableRankings: RankingWithMeasures[];
  userRankingEntries: RankingEntriesWithRankingAndValues;
}) => {
  const { setContent } = useModal();
  if (availableRankings.length === 0) return null;
  return (
    <PlusCircleIcon
      onClick={() =>
        setContent(
          <AddRankingEntryPanel
            availableRankings={availableRankings}
            userRankingEntries={userRankingEntries}
          />
        )
      }
    />
  );
};
export default TriggerAddRankingEntryPanel;
