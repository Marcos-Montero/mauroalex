"use client";
import { useSession } from "next-auth/react";

import MauroLanding from "./MauroLanding";

const whitelist = [
  process.env.NEXT_PUBLIC_MAURO_MAIL,
  process.env.NEXT_PUBLIC_MAURO_MAIL_2,
  process.env.NEXT_PUBLIC_ADMIN_MAIL,
];

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
  if (whitelist.includes(session?.user?.email)) {
    return <>{children}</>;
  } else if (noLanding) {
    return <></>;
  } else {
    return <MauroLanding />;
  }
}
