import { BasicExercise } from "@prisma/client";

import Button from "../buttons";
import { ChartType } from "./basic-chart";

export const ExercisesNav = ({
  basicExercises,
  selectedChart,
  setSelectedChart,
}: {
  basicExercises: BasicExercise[];
  selectedChart: string;
  setSelectedChart: (name: ChartType) => void;
}) => {
  return (
    <div className="flex items-center  rounded-t-xl w-full  flex-wrap overflow-hidden">
      {basicExercises.map(({ name, id }) => (
        <Button
          key={id}
          onClick={() => setSelectedChart(name as ChartType)}
          disabled={selectedChart === name}
          className="bg-black/40 disabled:bg-gradient-to-b disabled:from-black disabled:to-red-900 disabled:opacity-100 disabled:text-white rounded-none flex-1"
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
