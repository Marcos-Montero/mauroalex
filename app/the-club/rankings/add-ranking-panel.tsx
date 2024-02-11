"use client";
import { useState } from "react";

import { PlusCircle, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import { useModal } from "@/context/ModalContext";
import { User } from "@prisma/client";

const AddRankingPanel = ({ user }: { user: User }) => {
  const { setContent } = useModal();
  const [loading, setLoading] = useState(false);
  const [rankingTitle, setRankingTitle] = useState("");
  const [measures, setMeasures] = useState<{ name: string }[]>([{ name: "" }]);
  const router = useRouter();
  const addMeasure = () => {
    setMeasures([...measures, { name: "" }]);
  };
  const createNewRanking = async () => {
    setLoading(true);

    const body = {
      title: rankingTitle,
      measures: measures,
    };
    const res = await fetch("/api/ranking", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContent(null);
    router.refresh();
  };
  const handleMeasureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newMeasures = [...measures];
    newMeasures[index].name = e.target.value;
    setMeasures(newMeasures);
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 justify-center items-center relative">
        <input
          type="text"
          name={rankingTitle}
          onChange={(e) => setRankingTitle(e.target.value)}
          className="bg-white/10 p-1 text-center backdrop-blur-xl focus:outline-none "
        />
        <label
          className="absolute top-[-5px] left-[10px] text-[10px] bg-white/10"
          htmlFor="title"
        >
          Title
        </label>
      </div>
      <div className="flex flex-col gap-2 w-full justify-evenly ">
        {measures.map((measure, index) => (
          <div className="relative" key={index}>
            <input
              type="text"
              name="measure"
              value={measure.name}
              onChange={(e) => handleMeasureChange(e, index)}
              className="bg-white/10  p-1 text-center backdrop-blur-xl focus:outline-none w-full"
            />
            <label
              className="absolute top-[-5px] left-[10px] text-[10px]"
              htmlFor="measure"
            >
              Measure {index + 1}
            </label>
          </div>
        ))}
        <Button onClick={addMeasure}>
          <PlusCircleIcon className="w-8 h-8" onClick={addMeasure} />
        </Button>
      </div>
      <div className="flex gap-2 justify-between items-center relative w-fit">
        <Button variant="outline" onClick={createNewRanking} disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setContent(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default function TriggerAddRankingpanel({ user }: { user: User }) {
  const { setContent } = useModal();
  return (
    <Button
      variant="success"
      className="gap-2 flex p-4"
      onClick={() => setContent(<AddRankingPanel user={user} />)}
    >
      <PlusCircle /> Create New Ranking
    </Button>
  );
}
