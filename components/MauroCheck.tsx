"use client";
import { useSession } from "next-auth/react";

import { whitelist } from "@/lib/consts";

import MauroLanding from "./MauroLanding";

export default function MauroCheck({
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
  if (whitelist.admin.has(session?.user?.email)) {
    return <>{children}</>;
  } else if (noLanding) {
    return <></>;
  } else {
    return <MauroLanding />;
  }
}
