import { getDifferenceColor } from '@/lib/utils';
import { User } from '@prisma/client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './ui/hover-card';

const weightRanges = [
  { color: "#f0f9ff", range: "0-1.5" },
  { color: "#d6e4ff", range: "1.5-3" },
  { color: "#adc6ff", range: "3-4.5" },
  { color: "#85a5ff", range: "4.5-6" },
  { color: "#597ef7", range: "6-7.5" },
  { color: "#2f54eb", range: "7.5-9" },
  { color: "#1d39c4", range: "9-10.5" },
  { color: "#10239e", range: "10.5-12" },
  { color: "#061178", range: "12-13.5" },
  { color: "#030852", range: ">= 13.5" },
];

export const WeightDiffBadge = ({
  weight,
  goalWeight,
}: Pick<User, "weight" | "goalWeight">) => {
  if (!weight || !goalWeight) return;
  const { diffColor, diffWeight } = getDifferenceColor(weight, goalWeight);
  return (
    <p>
      <HoverCard>
        <HoverCardTrigger>
          <span
            className={`p-1 flex items-center rounded-xl font-bold m-1 bg-black ${
              diffWeight > 8 ? "text-white" : "text-black"
            }`}
            style={{ background: diffColor }}
          >
            {goalWeight > weight ? "- " : "+ "}
            <span>{diffWeight}</span>
          </span>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="bg-zinc-900/75 w-fit">
          <ul className="flex flex-col gap-[-10px]">
            {weightRanges.map((range, index) => (
              <li className="flex gap-2 my-[-2px] items-center" key={index}>
                <div
                  className="w-2 h-2"
                  style={{ background: range.color }}
                ></div>
                <p className="text-[10px] text-white ">{range.range}</p>
              </li>
            ))}
          </ul>
        </HoverCardContent>
      </HoverCard>
    </p>
  );
};
