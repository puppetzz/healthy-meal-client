"use client";

import { UseAuth } from "@/context/AuthContext";
import { Black_Ops_One } from "next/font/google";
import { ActionIcon, Button, Group, HoverCard, rem } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Menu } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Input } from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  IconCalendarEvent,
  IconLogout,
  IconPlaylistAdd,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import Image from "next/image";

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
      <nav className="sticky top-0 z-[100] flex h-24 w-full items-center justify-between bg-white px-10">
        <div className="flex items-center">
          <a href="/">
            <Image
              src="/svg/healthy-meals-logo.svg"
              alt="logo"
              height={60}
              width={150}
            />
          </a>
          <div className="ml-5 flex">
            <ul className="flex">
              <li
                className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#FD7E14] hover:text-white"
                onClick={() => router.push("/recipes")}
              >
                Công Thức
              </li>
              <li
                className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#FD7E14] hover:text-white"
                onClick={() => router.push("/meal-plans")}
              >
                Kế Hoạch
              </li>
              <li
                className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold hover:bg-[#FD7E14] hover:text-white"
                onClick={() => router.push("/health-metrics")}
              >
                TDEE
              </li>
              {!!user && (
                <li className="group hover:bg-[#FD7E14] hover:text-white">
                  <span className="flex h-10 w-32 cursor-pointer items-center justify-center text-lg font-semibold">
                    Của Tôi
                  </span>
                  <div className="absolute hidden h-auto bg-[#FD7E14] group-hover:block">
                    <ul className="top-0 w-48 bg-[#FD7E14]">
                      <li onClick={() => router.push("/me/recipes")}>
                        <span className="flex h-12 cursor-pointer items-center py-1 pl-8 text-lg font-bold text-white hover:bg-white hover:text-[#FD7E14]">
                          Công Thức
                        </span>
                      </li>
                      <li onClick={() => router.push("/me/meal-plans")}>
                        <span className="flex h-12 cursor-pointer items-center py-1 pl-8 text-lg font-bold text-white hover:bg-white hover:text-[#FD7E14]">
                          Kế Hoạch
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
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
                <ActionIcon
                  color="orange"
                  radius="md"
                  className="h-8 w-8"
                  onClick={() => {
                    router.push(`/search?q=${searchBoxValue}`);
                  }}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </ActionIcon>
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
                  <Menu.Label>công thức</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconToolsKitchen2
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      router.push("/me/recipes");
                    }}
                  >
                    Công Thức
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconPlaylistAdd
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      router.push("/create/recipes");
                    }}
                  >
                    Tạo Công Thức Mới
                  </Menu.Item>
                  <Menu.Label>kế hoạch</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconCalendarEvent
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      router.push("/me/meal-plans");
                    }}
                  >
                    Kế Hoạch
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconPlaylistAdd
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      router.push("/create/meal-plan");
                    }}
                  >
                    Tạo Kế Hoạch Mới
                  </Menu.Item>
                  <Menu.Label>cài đặt</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="red"
                    onClick={signOut}
                  >
                    Đăng Xuất
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
