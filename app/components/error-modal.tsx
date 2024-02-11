"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/buttons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

export const ErrorModal = () => {
  const sp = useSearchParams();
  const pathname = usePathname();
  const replace = useRouter().replace;
  const isOpen = sp.get("error") === "unauthorized";
  const closeModal = () => {
    replace(pathname);
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>Access Unauthorized</AlertDialogHeader>
        <AlertDialogDescription>
          You have beeen redirected to the home page because you are not
          authorized to access.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
