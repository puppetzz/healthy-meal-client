import { Avatar, Burger, Button, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";
import { UseAuth } from "../../context/AuthContext";
import { Black_Ops_One } from "next/font/google";
import { cn } from "../../lib/utils";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
});

type MealPlanCreationNavProps = {
  opened: boolean;
  toggle: () => void;
  className?: string;
};

export function MealPlanCreationNav({
  opened,
  toggle,
  className,
}: MealPlanCreationNavProps) {
  const router = useRouter();
  const { user, signInGoogle, signOut } = UseAuth();

  return (
    <>
      <nav
        className={cn(
          "flex h-20 w-full items-center justify-between px-10",
          className,
        )}
      >
        <div className="flex items-center">
          <div
            className={`${blackOpsOne.className} flex cursor-pointer flex-col items-center text-2xl uppercase`}
            onClick={() => {
              router.push("/");
            }}
          >
            <span>heathy</span>
            <span>meals</span>
          </div>
          <div className="ml-5 flex">
            <div
              className="flex h-8 w-32 cursor-pointer items-center justify-center text-sm font-semibold hover:bg-[#f76707] hover:text-white"
              onClick={() => {
                router.push("/recipes");
              }}
            >
              <span>Recipes</span>
            </div>

            <div
              className="flex h-8 w-32 cursor-pointer items-center justify-center text-sm font-semibold hover:bg-[#f76707] hover:text-white"
              onClick={() => {
                router.push("/meal-plans");
              }}
            >
              <span>Meal Plans</span>
            </div>

            <div
              className="flex h-8 w-32 cursor-pointer items-center justify-center text-sm font-semibold hover:bg-[#f76707] hover:text-white"
              onClick={() => {
                router.push("/blog");
              }}
            >
              <span>Blog</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
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
          <div>
            <Burger opened={opened} onClick={toggle} />
          </div>
        </div>
      </nav>
    </>
  );
}
