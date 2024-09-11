"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Link from "next/link";
import LockIcon from '@mui/icons-material/Lock';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

const ProfileInfo = () => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              alt={session?.user?.name ?? ""}
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              alt={session?.user?.name ?? ""}
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {session?.user?.name ?? "Mcc Callem"}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              @yodigitals
            </Link>
          </div>
        </DropdownMenuLabel>
       
       
        <DropdownMenuGroup>
          <Link href="/dashboard" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
            
              <PersonOutlineIcon  className="w-4 h-4" />
              User Profile
            </DropdownMenuItem>
          </Link>
          
          <Link href="/dashboard">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
            <LockIcon  className="w-4 h-4"  />
              Change Password
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
            <FlipCameraAndroidIcon className="w-4 h-4" />
            Service Center
            </DropdownMenuItem>
          </Link>


          <Link href="/dashboard">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
          <  CampaignIcon  className="w-4 h-4" />
            Announcement
            </DropdownMenuItem>
          </Link>
       
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
