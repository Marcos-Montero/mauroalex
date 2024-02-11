"use client";

import { ChangeEvent, useState } from "react";

import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { DurationInput } from "@/components/DurationInput";
import { defaultUserAvatar } from "@/consts";
import { useModal } from "@/context/ModalContext";
import {
  Measure,
  Ranking,
  RankingEntry,
  RankingEntryValue,
  User,
} from "@prisma/client";

type RankingWithMeasures = Ranking & { measures: Omit<Measure, "rankingId">[] };

const EditUserEntryPanel = ({
  availableRankings,
  availableUsers,
  availableEntries,
}: {
  availableRankings: RankingWithMeasures[];
  availableUsers: User[];
  availableEntries: (RankingEntry & { values: RankingEntryValue[] })[];
}) => {
  const [selectedRanking, setSelectedRanking] = useState<RankingWithMeasures>(
    availableRankings[0]
  );
  const [selectedUser, setSelectedUser] = useState<User>(availableUsers[0]);
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
  const getEntryValues = (uId: string, rId: string) =>
    availableEntries.find(
      ({ userId, rankingId }) => userId === uId && rankingId === rId
    )?.values;
  const [defaultValues, setDefaultValues] = useState<
    RankingEntryValue[] | undefined
  >(getEntryValues(selectedUser.id, selectedRanking.id));
  const [duration, setDuration] = useState(0);
  const router = useRouter();

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const user = availableUsers.find(({ id }) => id === e.target.value)!;
    setSelectedUser(user);
    setDefaultValues(getEntryValues(user.id, selectedRanking.id));
  };
  const handleRankingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const ranking = availableRankings.find(({ id }) => id === e.target.value)!;
    setSelectedRanking(ranking);
    setAvailableMeasures(
      ranking.measures.map(({ name, id }) => ({ id, name, value: 0 }))
    );
    setDefaultValues(getEntryValues(selectedUser.id, ranking.id));
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
      userId: selectedUser.id,
      measures: availableMeasures,
      rankingId: selectedRanking.id,
    };
    const res = await fetch("/api/ranking/entry-for-user", {
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
      <select className="bg-white/10" onChange={handleUserChange}>
        {availableUsers.map(({ id, name, nickname, image }) => (
          <option key={id} value={id}>
            <div className="flex gap-2 items-center">
              <Image
                src={image ?? defaultUserAvatar}
                alt={`${name}'s profile picture`}
                width={30}
                height={30}
                className="rounded-full hidden sm:block"
              />
              <p className="text-xs text-white">
                {nickname && nickname !== "" ? nickname : name}
              </p>
            </div>
          </option>
        ))}
      </select>
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
                  defaultValues?.find(({ measureId }) => measureId === id)
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

const TriggerEditUserEntryPanel = ({
  availableRankings,
  availableUsers,
  availableEntries,
}: {
  availableRankings: RankingWithMeasures[];
  availableUsers: User[];
  availableEntries: (RankingEntry & { values: RankingEntryValue[] })[];
}) => {
  const { setContent } = useModal();
  if (availableRankings.length === 0) return null;
  return (
    <Button
      variant="secondary"
      className="  gap-2 flex p-4 "
      onClick={() =>
        setContent(
          <EditUserEntryPanel
            availableRankings={availableRankings}
            availableUsers={availableUsers}
            availableEntries={availableEntries}
          />
        )
      }
    >
      <PencilIcon /> Edit User Entry
    </Button>
  );
};
export default TriggerEditUserEntryPanel;
