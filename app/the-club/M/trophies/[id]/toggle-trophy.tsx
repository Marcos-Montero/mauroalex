"use client";

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/buttons';
import Spinner from '@/components/spinner';

export const Toggletrophy = ({
  earned,
  userId,
  trophyId,
}: {
  earned: boolean;
  userId: string;
  trophyId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleTrophy = async (on: boolean) => {
    setLoading(true);
    if (on) {
      await fetch(`/api/users/trophy`, {
        method: "POST",
        body: JSON.stringify({ userId, trophyId }),
      });
    } else {
      await fetch(`/api/users/trophy`, {
        method: "DELETE",
        body: JSON.stringify({ userId }),
      });
    }
    router.refresh();
    setLoading(false);
  };

  if (loading) {
    return (
      <Button disabled>
        <Spinner className="h-4 w-4" />
      </Button>
    );
  }
  if (earned) {
    return <Button onClick={() => toggleTrophy(false)}>✅</Button>;
  }
  return <Button onClick={() => toggleTrophy(true)}>❌</Button>;
};
