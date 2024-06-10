"use client";

import { UseAuth } from "@/context/AuthContext";
import { Black_Ops_One } from "next/font/google";
import { Button } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Menu } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Input } from "@mantine/core";
import { useRouter } from "next/navigation";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
});

export const Navbar = () => {
  const { user, signInGoogle, signOut } = UseAuth();
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchBoxValue, setSearchBoxValue] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (showSearchBox) {
      searchInputRef.current?.focus();
    }
  }, [showSearchBox]);

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
              className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#f76707] hover:text-white"
              onClick={() => {
                router.push("/recipes");
              }}
            >
              <span>Công Thức</span>
            </div>

            <div
              className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#f76707] hover:text-white"
              onClick={() => {
                router.push("/meal-plans");
              }}
            >
              <span>Kế Hoạch</span>
            </div>

            <div
              className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#f76707] hover:text-white"
              onClick={() => {
                router.push("/health-metrics");
              }}
            >
              <span>TDEE</span>
            </div>

            {user && (
              <div
                className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#f76707] hover:text-white"
                onClick={() => {
                  router.push("/me");
                }}
              >
                <span>Của Tôi</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          {showSearchBox ? (
            <div className="flex items-center">
              <XMarkIcon
                className="mr-2 h-7 w-7 cursor-pointer text-[#9aa2b1] transition-opacity"
                onClick={() => setShowSearchBox(!showSearchBox)}
              />
              <div className="flex items-center rounded-lg border-[1px] px-1 pl-2 shadow-lg">
                <Input
                  placeholder="Search"
                  variant="unstyled"
                  size="md"
                  value={searchBoxValue}
                  onChange={(event) => {
                    setSearchBoxValue(event.target.value);
                  }}
                />
                <div
                  className="my-1 rounded-lg bg-[#ed8537] p-2"
                  onClick={() => {
                    router.push(`/search?q=${searchBoxValue}`);
                  }}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
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
              <Button variant="filled" color="orange" onClick={signInGoogle}>
                Sign In
              </Button>
            ) : (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar src={user?.photoURL} alt="avatar" />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => {
                      router.push("/post/create");
                    }}
                  >
                    New Recipe
                  </Menu.Item>
                  <Menu.Item onClick={signOut}>Sign Out</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
