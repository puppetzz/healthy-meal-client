"use client";

import { UseAuth } from "@/context/AuthContext";
import { Black_Ops_One } from "next/font/google";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
});

export const Navbar = () => {
  const { user, signInGoogle, signOut } = UseAuth();
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <nav className="flex h-28 w-full items-center justify-between px-10">
        <div className="flex items-center">
          <div
            className={`${blackOpsOne.className} flex cursor-pointer flex-col items-center text-4xl uppercase`}
            onClick={() => {
              router.push("/");
            }}
          >
            <span>heathy</span>
            <span>meals</span>
          </div>
          <div className="ml-5 flex">
            <div
              className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-slate-300"
              onClick={() => {
                router.push("/recipes");
              }}
            >
              <span>Recipes</span>
            </div>

            <div
              className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-slate-300"
              onClick={() => {
                router.push("/meal-plans");
              }}
            >
              <span>Meal Plans</span>
            </div>

            <div
              className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-slate-300"
              onClick={() => {
                router.push("/blog");
              }}
            >
              <span>Blog</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          {showSearchBox ? (
            <Input placeholder="Search" />
          ) : (
            <MagnifyingGlassIcon
              className="h-7 w-7"
              onClick={() => {
                setShowSearchBox(!showSearchBox);
              }}
            />
          )}
          <div>
            {!user ? (
              <Button className="w-24" onClick={signInGoogle}>
                Sign In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage src={user.photoURL as string} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
