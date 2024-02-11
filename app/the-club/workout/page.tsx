import { getSession } from "next-auth/react";

import { AuthCheckRedirect } from "@/components/AuthCheck";
import { prisma } from "@/lib/prisma";

import RecordsCard from "../(dashboard)/records-card";
import WorkoutCard from "./workout-card";

const WorkoutPage = async () => {
  const session = await getSession();
  if (!session) {
    return (
      <AuthCheckRedirect>
        <></>
      </AuthCheckRedirect>
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  if (!user) {
    return (
      <AuthCheckRedirect>
        <></>
      </AuthCheckRedirect>
    );
  }

  const userExercises = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      workout: {
        include: {
          exercises: true,
        },
      },
    },
  });
  const exercises = userExercises?.workout?.exercises;
  return (
    <AuthCheckRedirect>
      <main className="flex-col p-2 sm:p-4  flex gap-2 items-center h-full justify-center">
        <WorkoutCard exercises={exercises} />
        <RecordsCard />
      </main>
    </AuthCheckRedirect>
  );
};

export default WorkoutPage;
