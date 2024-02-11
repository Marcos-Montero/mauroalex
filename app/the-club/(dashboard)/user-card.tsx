import Image from "next/image";

import { WeightDiffBadge } from "@/components/weight-diff-badge";
import { defaultUserAvatar } from "@/consts";
import { getUser } from "@/lib/utils";

import TriggerEditProfilePanel from "./edit-profile-panel";

export const dynamic = "force-dynamic";
const UserCard = async () => {
  const user = await getUser();
  if (!user) return <></>;
  return (
    <div className="flex flex-col gap-4  backdrop-blur-xl  bg-gradient-to-tr from-white/5 via-indigo-500/5  text-white p-8 rounded-lg shadow-lg h-fit min-w-fit ">
      <div className="flex  items-center gap-4 justify-between flex-row">
        <div className="flex justify-center items-center flex-1 shrink-0 sm:shrink   min-w-fit">
          <Image
            alt="User Profile"
            src={user.image ?? defaultUserAvatar}
            height="64"
            width="64"
            className="rounded-full w-16 h-16 object-cover aspect-square sm:w-24 sm:h-24  shadow-[-2px_-2px_40px_rgba(255,255,255,.25)]"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 p-2   flex-1">
          <div className="flex flex-row justify-evenly sm:flex-row items-center gap-2  ">
            <div className="flex flex-col text-sm">
              <span className="text-sm sm:text-lg font-bold flex-1">
                {user.nickname ?? user.name}
              </span>
              {user.nickname && (
                <span className="text-sm italic text-zinc-400 hidden sm:block flex-1">
                  {user.name}
                </span>
              )}
            </div>
            <TriggerEditProfilePanel user={user} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-evenly flex-1 ">
            <div className="flex gap-2 w-full justify-evenly">
              <div className="flex flex-col ">
                <span className="text-lg font-bold">Age</span>
                <span className="text-sm">{user.age ?? "-"}</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-lg font-bold">Weight</span>
                <span className="text-sm">{user.weight ?? "- "} kg</span>
              </div>
            </div>
            <div className="flex gap-2 w-full justify-evenly items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">Goal</span>
                <span className="text-sm">{user.goalWeight ?? "-"} kg</span>
              </div>
              <WeightDiffBadge
                weight={user.weight}
                goalWeight={user.goalWeight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
