"use client";

import { FlameIcon } from "lucide-react";

import { Exercise } from "@prisma/client";

const WorkoutCard = ({
  exercises,
  className,
}: {
  exercises?: Exercise[];
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-4 backdrop-blur-xl  bg-gradient-to-tr from-white/5 via-indigo-500/5  text-white p-4 rounded-lg  min-w-fit  h-fit ${className}`}
    >
      <span className="text-lg font-bold flex gap-2 justify-center">
        <FlameIcon />
        Workout
      </span>
      <div className="outline outline-white/10 rounded-md">
        {!exercises && (
          <>
            <hr />{" "}
            <p className="p-4 w-full text-center italic">
              No workout assigned yet.
            </p>
          </>
        )}
        {exercises && (
          <table className="w-full text-sm text-center">
            <tbody>
              {exercises?.map(({ name, mark, id, workoutId }) => (
                <tr
                  className="border-b border-white/25"
                  key={name + mark + id + workoutId}
                >
                  <td className="border px-4 py-2 border-none">{name}</td>
                  <td className="border px-4 py-2 border-none">{mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
