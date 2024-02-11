"use client";

import { ChangeEvent, useState } from "react";

import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { useModal } from "@/context/ModalContext";
import { BasicExercise, User } from "@prisma/client";

import { DurationInput } from "../DurationInput";
import { durationBasedExercises } from "./basic-chart-card";

const AddNewRecordPanel = ({
  basicExercises,
  userId,
  selectedExercise,
}: {
  selectedExercise: string;
  basicExercises: BasicExercise[];

  userId: User["id"];
}) => {
  const [selectedBasicExercise, setSelectedBasicExercise] =
    useState<BasicExercise>(
      basicExercises.find(({ name }) => name === selectedExercise)!
    );
  const { setContent } = useModal();
  const [loading, setLoading] = useState(false);
  const [mark, setMark] = useState(0);
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate.toISOString().split("T")[0]);
  const router = useRouter();
  const handleBasicExerciseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const exercise = basicExercises.find(({ id }) => id === e.target.value)!;
    setSelectedBasicExercise(exercise);
  };

  const addRecord = async () => {
    setLoading(true);
    const res = await fetch("/api/users/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mark,
        userId,
        date,
        basicExerciseId: selectedBasicExercise.id,
      }),
    });
    setContent(null);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <select
        className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
        onChange={handleBasicExerciseChange}
        defaultValue={
          basicExercises.find(({ name }) => name === selectedExercise)?.id
        }
      >
        {basicExercises.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {durationBasedExercises.includes(selectedExercise) ? (
        <div className="flex flex-col gap-2 justify-center items-center relative">
          <DurationInput onChange={(value) => setMark(value)} />
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center relative">
          <input
            type="number"
            min={0}
            value={mark}
            onChange={(e) => setMark(parseInt(e.target.value))}
            className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 justify-center items-center relative">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
        />
      </div>
      <div className="flex gap-2 justify-between items-center relative w-fit">
        <Button variant="outline" onClick={addRecord} disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const TriggerAddNewRecordPanel = ({
  basicExercises,
  selectedExercise,
  userId,
}: {
  selectedExercise: string;
  basicExercises: BasicExercise[];
  userId: User["id"];
}) => {
  const { setContent } = useModal();
  if (!basicExercises) {
    return;
  }
  return (
    <Button
      variant="secondary"
      onClick={() =>
        setContent(
          <AddNewRecordPanel
            basicExercises={basicExercises}
            userId={userId}
            selectedExercise={selectedExercise}
          />
        )
      }
    >
      <PlusCircleIcon />
      {<p className="hidden sm:block">Add new Record</p>}
    </Button>
  );
};
export default TriggerAddNewRecordPanel;
