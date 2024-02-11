"use client";
import { useSession } from 'next-auth/react';

import Landing from '@/app/the-club/landing';

export function AuthCheck({
  children,
  noLanding = false,
}: {
  children: React.ReactNode;
  noLanding?: boolean;
}) {
  const { data: _, status } = useSession();
  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
export function AuthCheckRedirect({
  children,
  noLanding = false,
}: {
  children: React.ReactNode;
  noLanding?: boolean;
}) {
  const { data: _, status } = useSession();
  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <Landing />;
  }
}
