import { LogOutButton } from "@/components/buttons";
import { getUserWithRecords } from "@/lib/utils";
import { BasicExercise, Record as RecordType, User } from "@prisma/client";

import { Medalscard } from "./medals-card";
import UserCard from "./user-card";

export type UserWithDetails = User & {
  records: (RecordType & {
    basicExercise: BasicExercise;
  })[];
};
const Dashboard = async () => {
  const userWithDetails = await getUserWithRecords();
  if (!userWithDetails) {
    return;
  }
  return (
    <main className="flex-col p-2 sm:p-4 flex gap-4 items-center min-w-fit pb-32 sm:pb-0 ">
      <div className="sm:outline sm:outline-white/10  p-2 sm:p-4 rounded-xl flex flex-col gap-4 w-fit min-w-fit">
        <UserCard />
      </div>
      <Medalscard userWithDetails={userWithDetails} />

      <LogOutButton />
    </main>
  );
};

export default Dashboard;
