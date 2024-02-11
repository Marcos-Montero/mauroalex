"use client";
import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { useModal } from "@/context/ModalContext";
import { User } from "@prisma/client";

const DeletePokemonDialog = ({ name, id }: Pick<User, "name" | "id">) => {
  const [loading, setLoading] = useState(false);
  const { setContent } = useModal();
  const router = useRouter();
  const handleDeleteUser = async () => {
    setLoading(true);
    await fetch(`/api/users`, {
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
        Are you sure you want to delete {name} ? <br></br> This action is
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
export const TriggerDeletePokemonDialog = ({
  name,
  id,
}: Pick<User, "name" | "id">) => {
  const { setContent } = useModal();
  return (
    <Button
      variant="ghost"
      className="p-1 h-8 w-8 relative"
      onClick={() => setContent(<DeletePokemonDialog name={name} id={id} />)}
    >
      <TrashIcon />
    </Button>
  );
};
