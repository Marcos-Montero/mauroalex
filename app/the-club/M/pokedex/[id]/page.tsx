import { Suspense } from 'react';

import Image from 'next/image';

import { Medalscard } from '@/app/the-club/(dashboard)/medals-card';
import { AuthCheckRedirect } from '@/components/AuthCheck';
import { BasicChartCard } from '@/components/basic-charts/basic-chart-card';
import MauroCheck from '@/components/MauroCheck';
import Spinner from '@/components/spinner';
import { WeightDiffBadge } from '@/components/weight-diff-badge';
import { defaultUserAvatar } from '@/consts';
import { prisma } from '@/lib/prisma';
import { getUserWithRecords } from '@/lib/utils';

import TriggerEditWorkoutPanel from '../edit-challenges-panel';
import UserWorkoutCard from './user-workout-card';

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      workout: {
        include: {
          exercises: true, // Include all exercises related to the workout
        },
      },
    },
  });
  const userWithRecords = await getUserWithRecords(user?.id);
  if (!userWithRecords) return;
  const userRecords = userWithRecords.records;
  const basicExercises = await prisma.basicExercise.findMany();

  if (!user) {
    return <main>User not found</main>;
  }
  return (
    <AuthCheckRedirect>
      <MauroCheck>
        <main className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={user.image ?? defaultUserAvatar}
                alt={`${user.name}'s profile picture`}
                width={30}
                height={30}
                className=" w-12 h-12 rounded-full"
              />
              <h1 className="text-[32px] font-bold">{user.name}</h1>
              <hr className="border-t border-white w-full" />
              <div className="flex flex-row gap-4 items-center justify-evenly w-full ">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Age</span>
                  <span className="text-sm">{user.age}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Weight</span>
                  <span className="text-sm text-right">{user.weight} kg</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Goal</span>
                  <div className="flex items-center">
                    <span className="text-sm text-right">
                      {user.goalWeight ?? "-"} kg
                    </span>
                    <WeightDiffBadge
                      weight={user.weight}
                      goalWeight={user.goalWeight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <UserWorkoutCard exercises={user.workout?.exercises} />
            <TriggerEditWorkoutPanel user={user} disableHover />
          </div>

          <Suspense fallback={<Spinner />}>
            <Medalscard userWithDetails={userWithRecords} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <BasicChartCard
              userId={userWithRecords.id}
              basicExercises={basicExercises}
              userRecords={userRecords}
            />
          </Suspense>
        </main>
      </MauroCheck>
    </AuthCheckRedirect>
  );
}
