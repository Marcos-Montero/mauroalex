"use client";

import { useState } from "react";

import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { useModal } from "@/context/ModalContext";
import { getDurationString } from "@/lib/utils";
import { BasicExercise, User } from "@prisma/client";

import { RecordWithExercise } from "./basic-chart";
import { durationBasedExercises } from "./basic-chart-card";

const DeleteRecordPanel = ({
  selectedChartRecords,
  selectedChart,
  userId,
  selectedBasicExercise,
}: {
  selectedChartRecords?: RecordWithExercise[];
  selectedChart: string;
  userId: User["id"];
  selectedBasicExercise: BasicExercise;
}) => {
  const { setContent } = useModal();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(selectedChartRecords?.toReversed());
  const router = useRouter();

  const updateRecords = async () => {
    setLoading(true);
    const res = await fetch("/api/users/record", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        basicExerciseId: selectedBasicExercise.id,
        records,
      }),
    });
    setContent(null);
    router.refresh();
  };
  const removeSingle = (id: string) => {
    setRecords((records) => records?.filter((record) => record.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 items-center w-64 p-2">
      <h3>{selectedChart} records</h3>
      <div className="h-fit max-h-36  p-1 overflow-scroll w-full outline rounded-md outline-white/20 flex flex-col">
        {records?.map(({ timestamp, mark, id }) => (
          <div
            key={id}
            className="flex w-full items-center justify-between border-b border-white/10 "
          >
            <p className="italic text-white/50 text-xs">
              {timestamp.toLocaleDateString("es-es", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="font-bold">
              {durationBasedExercises.includes(selectedChart)
                ? getDurationString(mark)
                : mark + "reps"}
            </p>

            <Button
              variant="destructive"
              onClick={() => removeSingle(id)}
              className="p-2"
            >
              <XCircleIcon />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-between items-center relative w-fit">
        <Button variant="outline" onClick={updateRecords} disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const TriggerDeleteRecordPanel = ({
  selectedChartRecords,
  userId,
  selectedChart,
  selectedBasicExercise,
}: {
  selectedChartRecords?: RecordWithExercise[];
  selectedChart: string;
  userId: User["id"];
  selectedBasicExercise: BasicExercise;
}) => {
  const { setContent } = useModal();
  if (!selectedChartRecords) {
    return;
  }
  return (
    <Button
      variant="destructive"
      onClick={() =>
        setContent(
          <DeleteRecordPanel
            selectedChartRecords={selectedChartRecords}
            selectedChart={selectedChart}
            userId={userId}
            selectedBasicExercise={selectedBasicExercise}
          />
        )
      }
    >
      <XCircleIcon />
      {<p className="hidden sm:block">Delete a Record</p>}
    </Button>
  );
};
export default TriggerDeleteRecordPanel;
