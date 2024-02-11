"use client";
import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { useModal } from "@/context/ModalContext";
import { Ranking } from "@prisma/client";

const DeleteRankingDialog = ({ title, id }: Pick<Ranking, "title" | "id">) => {
  const [loading, setLoading] = useState(false);
  const { setContent } = useModal();
  const router = useRouter();
  const handleDeleteUser = async () => {
    setLoading(true);
    await fetch(`/api/ranking`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    router.refresh();
    setContent(null);
  };
  return (
    <>
      <p className="text-center">
        Are you sure you want to delete {title} ? <br></br> This action is
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
export const TriggerDeleteRankingDialog = ({
  title,
  id,
}: Pick<Ranking, "title" | "id">) => {
  const { setContent } = useModal();
  return (
    <Button
      className="p-1 h-8  relative  bg-red-700/80 hover:bg-red-600 w-32 mb-4"
      onClick={() => setContent(<DeleteRankingDialog title={title} id={id} />)}
    >
      <TrashIcon />
    </Button>
  );
};
