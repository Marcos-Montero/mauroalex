import { getServerSession } from 'next-auth';

import Landing from '@/app/the-club/landing';
import { AuthCheckRedirect } from '@/components/AuthCheck';
import MauroCheck from '@/components/MauroCheck';
import { prisma } from '@/lib/prisma';
import {
  Challenge,
  ChallengeSet,
  Exercise,
  User,
  Workout,
} from '@prisma/client';

import { PokemonList } from './pokemon-list';

export const dynamic = "force-dynamic";
export type UserWithExercisesChallenges = User & {
  workout?:
    | (Workout & {
        exercises: Exercise[];
      })
    | null;
} & {
  challengeSet?:
    | (ChallengeSet & {
        challenges: Challenge[];
      })
    | null;
};

export default async function Pokedex() {
  const session = getServerSession();
  if (!session) {
    return <Landing />;
  }
  const usersWithExercisesChallenges = await prisma.user.findMany({
    where: {
      email: {
        notIn: [
          process.env.NEXT_PUBLIC_ADMIN_MAIL!,
          process.env.NEXT_PUBLIC_MAURO_MAIL!,
          process.env.NEXT_PUBLIC_MAURO_MAIL_2!,
        ],
      },
    },
    include: {
      workout: {
        include: {
          exercises: true,
        },
      },
      challengeSet: {
        include: {
          challenges: true,
        },
      },
    },
  });
  return (
    <AuthCheckRedirect>
      <MauroCheck>
        <main className="flex flex-col sm:ml-[60px] sm:pb-0 pb-[60px] w-full items-center">
          <h1 className="text-3xl text-center w-full p-8">Pokédex</h1>
          {usersWithExercisesChallenges && (
            <PokemonList usersWithExercises={usersWithExercisesChallenges} />
          )}
        </main>
      </MauroCheck>
    </AuthCheckRedirect>
  );
}
