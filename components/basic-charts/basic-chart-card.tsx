"use client";
import { useState } from "react";

import { BasicExercise, User } from "@prisma/client";

import HanmaIconNoBg from "../hanma-icon-nobg";
import TriggerAddNewRecordPanel from "./add-new-record";
import { BasicChart, ChartType, RecordWithExercise } from "./basic-chart";
import TriggerDeleteRecordPanel from "./delete-record";
import { ExercisesNav } from "./exercises-nav";

export const durationBasedExercises = ["Plank", "LSit", "Burpees"];
export const durationReversedExercises = ["Burpees"];

export const BasicChartCard = ({
  userId,
  basicExercises,
  userRecords,
}: {
  userId: User["id"];
  basicExercises: BasicExercise[];
  userRecords: RecordWithExercise[];
}) => {
  const [selectedChart, setSelectedChart] = useState("Squats" as ChartType);
  const selectedChartRecords = userRecords
    .filter(({ basicExercise }) => basicExercise.name === selectedChart)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  const selectedBasicExercise = basicExercises.find(
    ({ name }) => name === selectedChart
  )!;
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="outline outline-white/10 rounded-xl w-full p-2">
        <span className="flex items-center text-xl font-bold gap-2 justify-center p-4">
          <HanmaIconNoBg className="w-12 h-12" /> Personal Records
        </span>
        <ExercisesNav
          basicExercises={basicExercises}
          selectedChart={selectedChart}
          setSelectedChart={setSelectedChart}
        />
        <BasicChart
          selectedChart={selectedChart}
          selectedChartRecords={selectedChartRecords}
          userId={userId}
        />
      </div>
      <div className="flex gap-2">
        <TriggerAddNewRecordPanel
          selectedExercise={selectedChart}
          userId={userId}
          basicExercises={basicExercises}
        />
        <TriggerDeleteRecordPanel
          selectedChart={selectedChart}
          userId={userId}
          selectedChartRecords={selectedChartRecords}
          selectedBasicExercise={selectedBasicExercise}
        />
      </div>
    </div>
  );
};
