import { Suspense } from 'react';

import { getServerSession } from 'next-auth';

import { AuthCheckRedirect } from '@/components/AuthCheck';
import { BasicChartCard } from '@/components/basic-charts/basic-chart-card';
import MauroCheck from '@/components/MauroCheck';
import Spinner from '@/components/spinner';
import UserCheck from '@/components/UserCheck';
import { prisma } from '@/lib/prisma';
import {
  getUser,
  getUserWithRecords,
} from '@/lib/utils';
import {
  Measure,
  Ranking,
  RankingEntry,
  RankingEntryValue,
  User,
} from '@prisma/client';

import Landing from '../landing';
import TriggerAddRankingpanel from './add-ranking-panel';
import TriggerEditUserEntryPanel from './edit-user-entry';
import { RankingTable } from './ranking-table';

export type RankingWithDetails = Ranking & {
  measures: Measure[];
  rankingEntries: (RankingEntry & {
    user: User;
    values: RankingEntryValue[];
  })[];
};

const Rankings = async () => {
  const session = await getServerSession();
  if (!session) {
    return <Landing />;
  }
  const user = await getUser();
  const rankingsWithDetails: RankingWithDetails[] =
    await prisma.ranking.findMany({
      include: {
        measures: true,
        rankingEntries: {
          include: {
            user: true,
            values: true,
          },
        },
      },
    });
  const userWithRecords = await getUserWithRecords();
  if (!userWithRecords) return;
  const userRecords = userWithRecords.records;
  const basicExercises = await prisma.basicExercise.findMany();
  const availableRankings = await prisma.ranking.findMany({
    include: {
      measures: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const availableUsers = await prisma.user.findMany({
    where: {
      specialty: true,
    },
  });
  const availableEntries = await prisma.rankingEntry.findMany({
    include: {
      values: true,
    },
  });
  return (
    <AuthCheckRedirect>
      <main className=" h-screen w-full  pb-32 sm:pb-0 items-center flex flex-col p-4 sm:p-8 gap-2">
        <div className="flex flex-col gap-4 w-full">
          <Suspense fallback={<Spinner />}>
            {rankingsWithDetails.map((ranking) => (
              <RankingTable key={ranking.id} ranking={ranking} />
            ))}
          </Suspense>
        </div>
        <UserCheck noLanding>
          <Suspense fallback={<Spinner />}>
            <BasicChartCard
              userId={userWithRecords.id}
              basicExercises={basicExercises}
              userRecords={userRecords}
            />
          </Suspense>
        </UserCheck>
        <MauroCheck noLanding>
          <div className="flex items-center gap-4">
            <TriggerEditUserEntryPanel
              availableRankings={availableRankings}
              availableUsers={availableUsers}
              availableEntries={availableEntries}
            />
            <TriggerAddRankingpanel user={user!} />
          </div>
        </MauroCheck>
      </main>
    </AuthCheckRedirect>
  );
};

export default Rankings;
