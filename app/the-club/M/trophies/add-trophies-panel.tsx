"use client";
import {
  ChangeEvent,
  useState,
} from 'react';

import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons';
import { useModal } from '@/context/ModalContext';

const AddTrophyPanel = () => {
  const { setContent } = useModal();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const router = useRouter();

  const createNewTrophy = async () => {
    if (!name || !description) return;
    setLoading(true);

    const body = {
      name,
      description,
    };
    const res = await fetch("/api/trophy", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContent(null);
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-col gap-2 w-full justify-evenly ">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
          />
          <label
            className="absolute top-[-5px] left-[10px] text-[10px]"
            htmlFor="measure"
          >
            Trophy Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
          />
          <label
            className="absolute top-[-5px] left-[10px] text-[10px]"
            htmlFor="measure"
          >
            Trophy Description
          </label>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center relative w-fit">
        <Button variant="outline" onClick={createNewTrophy} disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default function TriggerAddTrophypanel() {
  const { setContent } = useModal();
  return (
    <Button
      variant="secondary"
      className="  gap-2 flex p-4 "
      onClick={() => setContent(<AddTrophyPanel />)}
    >
      <PlusCircle /> Create New Trophy
    </Button>
  );
}
