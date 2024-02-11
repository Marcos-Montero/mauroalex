"use client";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Spinner from "./spinner";
import { Button, ButtonProps } from "./ui/button";

export const SignInButton = (props: ButtonProps) => {
  const { data: _, status } = useSession();
  if (status === "loading") {
    return (
      <Button disabled {...props}>
        <Spinner />
      </Button>
    );
  }
  if (status === "authenticated") {
    return null;
  }
  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };
  return (
    <Button onClick={handleSignIn} {...props}>
      <LogInIcon className="text-white hover:scale-110 duration-300" />
    </Button>
  );
};
export const LogOutButton = (props: ButtonProps) => {
  const { data: _, status } = useSession();
  const handleLogOut = () => {
    signOut();
    redirect("/");
  };
  if (status === "loading") {
    return <Button disabled>Loading...</Button>;
  }
  if (status !== "authenticated") {
    return null;
  }
  return (
    <button
      onClick={handleLogOut}
      className={
        "flex sm:gap-2 flex-col items-center w-fit h-fit " + props.className
      }
    >
      <LogOutIcon className="h-4" />
      <p className="text-[10px] text-white/50 ">Log out</p>
    </button>
  );
};

export default Button;
