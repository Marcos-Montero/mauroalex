"use client";
import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EditIcon,
  FlameIcon,
  PlusCircleIcon,
  TrashIcon,
  XIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import WorkoutCard from '@/app/the-club/workout/workout-card';
import Button from '@/components/buttons';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useModal } from '@/context/ModalContext';
import { timeSince } from '@/lib/utils';

import { UserWithExercisesChallenges } from './page';

type Workout = { name: string; mark: string }[];
const EditWorkoutPanel = ({ user }: { user: UserWithExercisesChallenges }) => {
  const initialWorkout: Workout = user.workout?.exercises
    ? user.workout.exercises.map(({ name, mark }) => ({ name, mark }))
    : [];
  const [loading, setLoading] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentMark, setCurrentMark] = useState("");
  const [workout, setWorkout] = useState(initialWorkout);
  const { setContent } = useModal();
  const router = useRouter();

  const resetInputFields = () => {
    setCurrentMark("");
    setCurrentName("");
  };

  const addExcerciseToWorkout = () => {
    if (
      !currentName ||
      currentName === "" ||
      !currentMark ||
      currentMark === ""
    )
      return;
    const newWorkout = { name: currentName, mark: currentMark };
    setWorkout((workout) => [...workout, newWorkout]);
    resetInputFields();
  };
  const removeField = (i: number) => {
    setWorkout((workout) => workout.filter((_, index) => index !== i));
  };
  const upgrade = (i: number) => {
    const newWorkout = [...workout];
    const temp = newWorkout[i];
    newWorkout[i] = newWorkout[i - 1];
    newWorkout[i - 1] = temp;
    setWorkout(newWorkout);
  };
  const downgrade = (i: number) => {
    const newWorkout = [...workout];
    const temp = newWorkout[i];
    newWorkout[i] = newWorkout[i + 1];
    newWorkout[i + 1] = temp;
    setWorkout(newWorkout);
  };
  const handleSaveWorkout = async (email: string, exercises: Workout) => {
    setLoading(true);
    const res = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify({ email, exercises }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.refresh();
    setContent(null);
  };
  const eraseWorkout = () => {
    setWorkout([]);
  };
  useEffect(() => {
    return router.refresh();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between w-full">
        <h3 className="text-3xl w-full text-center">Workout</h3>
        <Button onClick={eraseWorkout}>
          <TrashIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {workout.map(({ name, mark }, i) => {
          return (
            <div
              className="flex gap-2 w-full justify-evenly items-center h-8"
              key={name + mark + i}
            >
              <p className="border-b border-white text-center w-full">{name}</p>
              <p className="border-b border-white text-center w-full">{mark}</p>
              <div className="flex w-full h-full justify-center gap-4">
                <Button
                  onClick={() => removeField(i)}
                  className="p-0 m-0 h-full w-full flex items-center"
                >
                  <XIcon height={6} className="p-0 m-0  h-full w-full" />
                </Button>
                <div className="flex w-full">
                  {i > 0 && (
                    <Button
                      className="p-0 m-0 h-full w-full"
                      onClick={() => upgrade(i)}
                    >
                      <ArrowUpIcon
                        height={12}
                        className="p-0 m-0  h-full w-full"
                      />
                    </Button>
                  )}
                  {i !== workout.length - 1 && (
                    <Button
                      className="p-0 m-0 h-full w-full flex items-center"
                      onClick={() => downgrade(i)}
                    >
                      <ArrowDownIcon
                        height={12}
                        className="p-0 m-0  h-full w-full  flex items-center"
                      />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex gap-2 justify-center py-4 w-full">
          <Button>
            <PlusCircleIcon onClick={addExcerciseToWorkout} />
          </Button>
          <input
            type="text"
            name="name"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            className="bg-white/20 w-32"
          />
          <input
            type="text"
            name="mark"
            value={currentMark}
            onChange={(e) => setCurrentMark(e.target.value)}
            className="bg-white/20 w-16"
          />
        </div>
        <div className="flex gap-2 justify-center items-center relative w-full">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => user.email && handleSaveWorkout(user.email, workout)}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
          <Button variant="outline" onClick={() => setContent(null)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const TriggerEditWorkoutPanel = ({
  user,
  disableHover = false,
}: {
  user: UserWithExercisesChallenges;
  disableHover?: boolean;
}) => {
  const { setContent } = useModal();
  if (disableHover) {
    return (
      <Button
        variant="secondary"
        className="p-1 h-8 w-8 "
        onClick={() => setContent(<EditWorkoutPanel user={user} />)}
      >
        <EditIcon />
      </Button>
    );
  }
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          variant="secondary"
          className="p-1 h-8 w-8 relative"
          onClick={() => setContent(<EditWorkoutPanel user={user} />)}
        >
          <FlameIcon />
          {user.workoutAssignedDate && (
            <p className="italic text-white/50 hidden sm:block absolute -right-16 top-[25%]">
              {timeSince(user.workoutAssignedDate)}
            </p>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="bg-zinc-900/25">
        <WorkoutCard exercises={user.workout?.exercises} />
      </HoverCardContent>
    </HoverCard>
  );
};
export default TriggerEditWorkoutPanel;
