import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const GET = async (request: Request) => {
  const { email } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user?.workoutId) {
    return NextResponse.error();
  }
  const exercises = await prisma.exercise.findMany({
    where: {
      workoutId: user.workoutId,
    },
  });
  return NextResponse.json(exercises);
};
export const POST = async (req: Request) => {
  const { exercises, email } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  const userId = user?.id;
  if (!userId) {
    return NextResponse.error();
  }
  const existingWorkout = await prisma.workout.findUnique({
    where: {
      userId: userId,
    },
  });

  if (existingWorkout) {
    // If the workout exists, update the workout and exercises
    await prisma.workout.update({
      where: {
        id: existingWorkout.id,
      },
      data: {
        exercises: {
          deleteMany: {}, // This will delete all related exercises
          create: exercises, // This will create the new set of exercises provided
        },
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        workoutAssignedDate: new Date(),
      },
    });
  } else {
    // If the workout does not exist, create a new workout with exercises
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        workoutAssignedDate: new Date(),
        workout: {
          create: {
            exercises: {
              createMany: {
                data: exercises,
              },
            },
          },
        },
      },
    });
  }

  return NextResponse.json({});
};
