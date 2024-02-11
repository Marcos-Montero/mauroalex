"use client";
import { useState } from 'react';

import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons';
import { useModal } from '@/context/ModalContext';
import { Trophy } from '@prisma/client';

const DeleteRankingDialog = ({ trophy }: { trophy: Trophy }) => {
  const [loading, setLoading] = useState(false);
  const { setContent } = useModal();
  const router = useRouter();
  const handleDeleteUser = async () => {
    setLoading(true);
    await fetch(`/api/trophy`, {
      method: "DELETE",
      body: JSON.stringify({ id: trophy.id }),
    });
    setLoading(false);
    router.refresh();
    setContent(null);
  };
  return (
    <>
      <p className="text-center">
        Are you sure you want to delete {trophy.name} ? <br></br> This action is
        irreversible
      </p>
      <div className="flex gap-2 justify-center items-center relative w-full">
        <Button variant="outline" disabled={loading} onClick={handleDeleteUser}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </>
  );
};
export const TriggerDeleteRankingDialog = ({ trophy }: { trophy: Trophy }) => {
  const { setContent } = useModal();
  return (
    <Button
      className=" h-6  relative  bg-red-700/80 hover:bg-red-600 "
      onClick={() => setContent(<DeleteRankingDialog trophy={trophy} />)}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
};
