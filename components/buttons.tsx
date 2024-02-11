"use client";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Spinner from "./spinner";
import { Button, ButtonProps } from "./ui/button";

export const LogButton = (props: ButtonProps) => {
  const { data: _, status } = useSession();
  const handleLogOut = () => {
    signOut();
    redirect("/");
  };
  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };
  if (status === "loading") {
    return (
      <Button disabled {...props}>
        <Spinner />
      </Button>
    );
  }
  if (status === "authenticated") {
    return (
      <button onClick={handleLogOut} {...props}>
        <LogOutIcon className="text-white hover:scale-110 duration-300" />
      </button>
    );
  }

  return (
    <Button onClick={handleSignIn} {...props}>
      <LogInIcon className="text-white hover:scale-110 duration-300" />
    </Button>
  );
};

export default Button;
