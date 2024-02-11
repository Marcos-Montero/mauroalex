"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const blacklist = [
  process.env.NEXT_PUBLIC_MAURO_MAIL,
  process.env.NEXT_PUBLIC_MAURO_MAIL_2,
];

export default function UserCheck({
  children,
  noLanding = false,
}: {
  children: React.ReactNode;
  noLanding?: boolean;
}) {
  const { data: session } = useSession();
  if (!session?.user?.email) {
    return;
  }
  if (!blacklist.includes(session?.user?.email)) {
    return <>{children}</>;
  } else if (noLanding) {
    return <></>;
  } else {
    redirect("/M/pokedex");
  }
}
