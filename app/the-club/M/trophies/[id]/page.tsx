import Image from 'next/image';

import Landing from '@/app/the-club/landing';
import { AuthCheckRedirect } from '@/components/AuthCheck';
import MauroCheck from '@/components/MauroCheck';
import { defaultUserAvatar } from '@/consts';
import { prisma } from '@/lib/prisma';

import { Toggletrophy } from './toggle-trophy';

export default async function TrophyPage({
  params,
}: {
  params: { id: string };
}) {
  const users = await prisma.user.findMany({
    where: {
      specialty: true,
    },
    include: {
      userTrophies: true,
    },
  });
  const trophy = await prisma.trophy.findUnique({
    where: {
      id: params.id,
    },
  });
  const usersIdWithTrophy = users
    .filter((user) => user.userTrophies.find((t) => t.trophyId === trophy?.id))
    .map((user) => user.id);
  if (!users) {
    return <Landing />;
  }
  if (!trophy) {
    return;
  }
  return (
    <AuthCheckRedirect>
      <MauroCheck>
        <main className="flex items-center flex-col w-full gap-4">
          <h1 className="text-[32px] font-bold">{trophy.name}</h1>
          <span className="text-sm">{trophy.description}</span>
          <div className="p-4 outline outline-white/20 rounded-xl flex flex-col gap-4">
            {users?.map((user) => (
              <div
                className="flex items-center justify-between w-64 border-b border-white rounded-xl  gap-2"
                key={user.id}
              >
                <Image
                  src={user.image ?? defaultUserAvatar}
                  alt={`${user.name}'s profile picture`}
                  width={30}
                  height={30}
                  className="rounded-full hidden sm:block"
                />
                <span className="text-sm">
                  {user.nickname ? user.nickname : user.name}
                </span>
                <Toggletrophy
                  userId={user.id}
                  trophyId={trophy.id}
                  earned={usersIdWithTrophy.includes(user.id)}
                />
              </div>
            ))}
          </div>
        </main>
      </MauroCheck>
    </AuthCheckRedirect>
  );
}
