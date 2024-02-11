import React from 'react';

import {
  BookUserIcon,
  FlameIcon,
  LucideIcon,
  TrophyIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

import { LogOutButton } from './buttons';
import HanmaIconNoBg from './hanma-icon-nobg';
import MauroCheck from './MauroCheck';
import UserCheck from './UserCheck';

export const NavMenu = () => {
  return (
    <ul
      className={`flex sm:flex-col gap-2 sm:gap-8 text-white items-center  justify-evenly  sm:text-[12px] sm:duration-300 w-full`}
    >
      <UserCheck noLanding>
        <MenuLink href="/" Icon={UserIcon}>
          Dashboard
        </MenuLink>
        <MenuLink href="/rankings" Icon={HanmaIconNoBg}>
          Rankings
        </MenuLink>
        <MenuLink href="/workout" Icon={FlameIcon}>
          Workout
        </MenuLink>
      </UserCheck>
      <MauroCheck noLanding>
        <MenuLink href="/rankings" Icon={HanmaIconNoBg}>
          Rankings
        </MenuLink>
        <MenuLink href="/M/pokedex" Icon={BookUserIcon}>
          Pokédex
        </MenuLink>
        <MenuLink href="/M/trophies" Icon={TrophyIcon}>
          Trophies
        </MenuLink>
      </MauroCheck>
      <LogOutButton className="sm:hidden" variant="ghost" />
    </ul>
  );
};

const MenuLink = ({
  children,
  href,
  className,
  iconClassName,
  Icon,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  iconClassName?: string;
  Icon: LucideIcon | React.FC<{ className: string }>;
}) => (
  <li>
    <Link
      href={href}
      className={`flex flex-col sm:gap-1 items-center  ${className} hover:bg-gradient-radial from-red-800/60 via-red-800/25 to-transparent`}
    >
      <Icon className={`h-5 sm:h-6 ${iconClassName}`} />
      <p className="text-[10px] text-white/50 ">{children}</p>
    </Link>
  </li>
);
