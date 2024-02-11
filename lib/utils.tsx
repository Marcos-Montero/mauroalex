import { type ClassValue, clsx } from "clsx";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

/* 
import { PrismaAdapter } from "@next-auth/prisma-adapter"; */
import { User } from "@prisma/client";

import { prisma } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/* export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
}; */

export const getDifferenceColor = (
  weight?: User["weight"],
  goalWeight?: User["goalWeight"]
) => {
  if (!weight || !goalWeight) return { diffColor: "", diffWeight: 0 };
  const diffWeight = Math.abs(weight - goalWeight);
  const gradientColors = [
    "#f0f9ff", // 0 <= differencePercentage < 1.5
    "#d6e4ff", // 1.5 <= differencePercentage < 3
    "#adc6ff", // 3 <= differencePercentage < 4.5
    "#85a5ff", // 4.5 <= differencePercentage < 6
    "#597ef7", // 6 <= differencePercentage < 7.5
    "#2f54eb", // 7.5 <= differencePercentage < 9
    "#1d39c4", // 9 <= differencePercentage < 10.5
    "#10239e", // 10.5 <= differencePercentage < 12
    "#061178", // 12 <= differencePercentage < 13.5
    "#030852", // differencePercentage >= 13.5
  ];
  const step = 1.5;
  const index = Math.round(diffWeight / step);
  const diffColor = gradientColors[index < 10 ? index : 9];
  return {
    diffColor,
    diffWeight: parseFloat(diffWeight.toFixed(2)),
  };
};
export const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval} year${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? "" : "s"} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} d ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} h ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} m ago`;
  }
  return `${Math.floor(seconds)} s ago`;
};

export const getUser = async () => {
  const session = await getSession();
  if (!session?.user?.email) return;
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  return user;
};
export const getUserWithRecords = async (id?: string) => {
  const session = await getSession();
  if (!session?.user?.email) return;

  const whereObject = id
    ? {
        id: id,
      }
    : { email: session.user.email };

  const user = await prisma.user.findUnique({
    where: whereObject,
    include: {
      records: {
        include: {
          basicExercise: true,
        },
      },
    },
  });
  if (!user) return;
  return user;
};
export const getDurationString = (duration?: number) => {
  if (!duration) return;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${hours ? `${hours}h` : ""} ${
    minutes ? `${minutes}m` : ""
  } ${seconds}s`;
};
export const getRank = (
  n: number,
  ranks: { name: string; value: number }[],
  reversed: boolean = false
) => {
  const firstRankNotReached = ranks.find((r) =>
    reversed ? r?.value < n : r?.value > n
  );
  const rank = firstRankNotReached
    ? ranks[ranks.indexOf(firstRankNotReached) - 1]
    : ranks[ranks.length - 1];
  if (!firstRankNotReached) {
    return { rank: ranks[ranks.length - 1].name, division: "" };
  }
  const divisionRange = (firstRankNotReached?.value - rank?.value) / 5;
  const division = Math.floor((n - rank?.value) / divisionRange);
  const divisions = ["I", "II", "III", "IV", "V"];

  return { rank: rank?.name, division: divisions[division] };
};

/* TODO: export const getUserRanks= (userWithRecordsAndExercises) => {
  return [{exerciseName, rank, division}]
}
 */
