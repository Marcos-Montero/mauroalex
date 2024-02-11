"use client";

import { useState } from "react";

import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { useModal } from "@/context/ModalContext";
import { User } from "@prisma/client";

const EditProfilePanel = ({ user }: { user: User }) => {
  const { setContent } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const body = {
      nickname: formData.get("nickname"),
      weight: formData.get("weight"),
      goalWeight: formData.get("goalWeight"),
      age: formData.get("age"),
    };
    const res = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContent(null);
    router.refresh();
  };

  return (
    <form onSubmit={updateUser} className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 justify-center items-center relative">
        <input
          type="text"
          name="nickname"
          defaultValue={user?.nickname ?? ""}
          className="bg-white/10 p-1 text-center backdrop-blur-xl focus:outline-none "
        />
        <label
          className="absolute top-[-5px] left-[10px] text-[8px] bg-white/10"
          htmlFor="nickname"
        >
          Nickname
        </label>
      </div>
      <div className="flex gap-2 w-full justify-evenly ">
        <div className="relative w-12">
          <input
            type="text"
            name="age"
            defaultValue={user?.age ?? 0}
            className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
          />
          <label
            className="absolute top-[-5px] left-[10px] text-[8px]"
            htmlFor="age"
          >
            Age
          </label>
        </div>
        <div className="relative w-12">
          <input
            type="number"
            step=".05"
            name="weight"
            className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
            defaultValue={user?.weight ?? ""}
          />
          <label
            className="absolute top-[-5px] left-[10px] text-[8px]"
            htmlFor="weight"
          >
            Weight
          </label>
        </div>
        <div className="relative w-12 ">
          <input
            type="number"
            step=".05"
            name="goalWeight"
            className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
            defaultValue={user?.goalWeight ?? ""}
          />
          <label
            className="absolute top-[-5px] left-[10px] text-[8px]"
            htmlFor="goalWeight"
          >
            Goal
          </label>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center relative w-fit">
        <Button variant="outline" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const TriggerEditProfilePanel = ({ user }: { user: User }) => {
  const { setContent } = useModal();
  return (
    <Button
      variant="secondary"
      className="px-2 py-1 "
      onClick={() => setContent(<EditProfilePanel user={user} />)}
    >
      <EditIcon />
    </Button>
  );
};
export default TriggerEditProfilePanel;
