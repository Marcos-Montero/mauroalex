"use client";

import { useMemo, useState } from "react";

import { ArrowUpDown, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WeightDiffBadge } from "@/components/weight-diff-badge";
import { defaultUserAvatar } from "@/consts";
import { User } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { TriggerDeletePokemonDialog } from "./delete-pokemon-dialog";
import TriggerEditWorkoutPanel from "./edit-challenges-panel";
import { UserWithExercisesChallenges } from "./page";

export const PokemonList = ({
  usersWithExercises,
}: {
  usersWithExercises: UserWithExercisesChallenges[];
}) => {
  const [specialsOnly, setSpecialsOnly] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "workout", desc: false },
  ]);
  const [specialtyLoading, setSpecialtyLoading] = useState(false);
  const router = useRouter();
  const toggleSpecialty = async (user: User) => {
    setSpecialtyLoading(true);
    await fetch(`/api/users/specialty`, {
      method: "PUT",
      body: JSON.stringify({ id: user.id, specialty: !user.specialty }),
    });
    setSpecialtyLoading(false);
    router.refresh();
  };
  const columns: ColumnDef<UserWithExercisesChallenges>[] = useMemo(
    () => [
      {
        accessorKey: "specialty",
        header: "",
        cell: ({ row }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => toggleSpecialty(row.original)}
              disabled={specialtyLoading}
            >
              <StarIcon
                fill={row.original.specialty ? "gold" : ""}
                stroke={row.original.specialty ? "" : "white"}
              />
            </Button>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <Link
              href={`/M/pokedex/${row.original.id}`}
              className="flex items-center underline gap-2"
            >
              <Image
                src={row.original.image ?? defaultUserAvatar}
                alt={`${row.original.name}'s profile picture`}
                width={30}
                height={30}
                className="rounded-full hidden sm:block"
              />
              <p className="text-xs text-white">
                {row.original.nickname
                  ? row.original.nickname
                  : row.original.name}
              </p>
            </Link>
            <TriggerDeletePokemonDialog
              name={row.original.name}
              id={row.original.id}
            />
          </div>
        ),
      },
      {
        accessorKey: "weight",
        header: "Weight",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <p>{row.original.weight} kg</p>
            <div className="hidden sm:block">
              <WeightDiffBadge
                weight={row.original.weight}
                goalWeight={row.original.goalWeight}
              />
            </div>
          </div>
        ),
      },
      {
        accessorKey: "workout",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Workout
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const workout = row.original.workout;
          if (!workout || !row.original.specialty) return <p>-</p>;
          return <TriggerEditWorkoutPanel user={row.original} />;
        },
        sortingFn: (
          a: Row<UserWithExercisesChallenges>,
          b: Row<UserWithExercisesChallenges>
        ) => {
          const ao = a.original;
          const bo = b.original;

          if (!ao?.specialty && !bo?.specialty) {
            return 0;
          } else if (!ao?.specialty) {
            return 1;
          } else if (!bo?.specialty) {
            return -1;
          } else {
            return (
              ao?.workoutAssignedDate?.getDate()! -
              bo?.workoutAssignedDate?.getDate()!
            );
          }
        },
      },
      {
        accessorKey: "Challenges",
        header: ({ column }) => {
          return <Button variant="ghost">Challenges</Button>;
        },
        cell: ({ row }) => {
          const workout = row.original.challengeSet;
          if (!workout || !row.original.specialty) return <p>-</p>;
          return <TriggerEditWorkoutPanel user={row.original} />;
        },
        sortingFn: (
          a: Row<UserWithExercisesChallenges>,
          b: Row<UserWithExercisesChallenges>
        ) => {
          const ao = a.original;
          const bo = b.original;

          if (!ao?.specialty && !bo?.specialty) {
            return 0;
          } else if (!ao?.specialty) {
            return 1;
          } else if (!bo?.specialty) {
            return -1;
          } else {
            return (
              ao?.workoutAssignedDate?.getDate()! -
              bo?.workoutAssignedDate?.getDate()!
            );
          }
        },
      },
    ],
    []
  );
  const rows = specialsOnly
    ? usersWithExercises.filter((user) => user.specialty)
    : usersWithExercises;
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (!usersWithExercises) return;
  return (
    <div className="h-fit max-h-full overflow-y-scroll outline outline-white/20 rounded-md p-2">
      <Table className="bg-black/50 p-2 rounded-md  w-fit">
        <TableHeader className="text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const user = row.original;
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
