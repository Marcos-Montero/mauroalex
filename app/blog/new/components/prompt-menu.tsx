import { ChevronsUpDown, InfoIcon, Trash2Icon } from "lucide-react";

import Button from "@/components/buttons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserPrompts } from "@prisma/client";

import { createPrompt, deletePrompt, selectPrompt } from "../../actions";

export const PromptMenu = ({
  availablePrompts,
  selectedPrompt,
}: {
  availablePrompts?: UserPrompts[];
  selectedPrompt: UserPrompts;
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Collapsible>
        <CollapsibleTrigger className="flex gap-2">
          <h1 className="text-3xl italic px-4 pl-2 py-2 self-start">
            New post
          </h1>
          <Button className=" flex gap-2 hover:scale-105 hover:bg-zinc-900 outline w-32">
            AI
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex items-center flex-wrap w-full">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button type="submit">+ Create prompt</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className=" bg-transparent">
                <form action={createPrompt}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Create a new prompt</AlertDialogTitle>
                    <AlertDialogDescription className="py-4">
                      <textarea
                        placeholder="Instrucciones para el prompt..."
                        name="prompt"
                        id="prompt"
                        className="bg-zinc-950 text-white rounded-xl w-full h-32 outline focus:ring focus:ring-zinc-500 focus:ring-opacity-50 p-2"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button type="submit">Create</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>

            {availablePrompts &&
              availablePrompts.length > 0 &&
              availablePrompts.map((prompt, i) => (
                <div
                  key={prompt.id}
                  className="flex items-center px-4 py-2 rounded-xl gap-4"
                >
                  <form
                    key={prompt.id}
                    className="flex gap-0 bg-white/60 text-black rounded-xl px-2 py-1 hover:bg-white/90 duration-500"
                    action={selectPrompt}
                  >
                    <input type="hidden" value={prompt.id} name="promptId" />
                    <button
                      type="submit"
                      className=" w-64 overflow-hidden overflow-ellipsis whitespace-nowrap underline"
                    >
                      {prompt.prompt}
                    </button>
                  </form>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <InfoIcon className="size-5 hover:cursor-zoom-in" />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p>{prompt.prompt}</p>
                      <form action={deletePrompt}>
                        <input
                          type="hidden"
                          name="promptId"
                          id="promptId"
                          value={prompt.id}
                        />
                        <button
                          type="submit"
                          className="w-full flex justify-center p-2 bg-red-700 hover:bg-red-500"
                        >
                          <Trash2Icon className="size-4" />
                        </button>
                      </form>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
          </div>
          <p className="bg-white/10 p-4 rounded-xl">
            selected prompt: {selectedPrompt?.prompt}
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
