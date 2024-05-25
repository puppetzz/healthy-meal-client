"use client";
import { HorizontalCard } from "@/components/cards/HorizontalCard";
import { Input } from "@mantine/core";
import {
  AdjustmentsHorizontalIcon,
  ArrowLongRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="pb-16">
        <div className="mx-auto mt-4 flex max-w-[1200px] items-center justify-between">
          <div className="flex flex-col text-lg font-semibold">
            <span>Simple Recipes That</span>
            <span>Make You Feel Good</span>
          </div>
          <span className="text-3xl font-semibold uppercase">Recipes</span>
          <div className="flex cursor-pointer gap-1">
            <span className="font-semibold uppercase">Show me everything</span>
            <ArrowLongRightIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="mx-auto mt-5 max-w-[1200px]">
          <div className="grid grid-cols-4 gap-5">
            <div className="flex flex-col items-center gap-5">
              <div className="flex grow flex-col items-center gap-2">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2024/03/Best-Vegan-Gluten-Free-Vanilla-Cake-10-768x1152.jpg"
                  alt=""
                />
                <span className="text-center text-xl font-bold">
                  The BEST Gluten-Free Vanilla Cake (1 Bowl!)
                </span>
              </div>
              <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-orange-400 text-xl font-bold">
                New Recipes
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="flex grow flex-col items-center gap-2">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2018/02/DELICIOUS-Black-Bean-Plantain-Bowls-9-healthy-ingredients-BIG-flavor-SO-satisfying-vegan-glutenfree-plantains-beans-plantbased-minimalistbaker-10-768x1152.jpg"
                  alt=""
                />
                <span className="text-center text-xl font-bold">
                  Roasted Plantain & Black Bean Vegan Bowl
                </span>
              </div>
              <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-orange-400 text-xl font-bold">
                New Recipes
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="flex grow flex-col items-center gap-2">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2017/06/AMAZING-Cashew-Buttercream-Frosting-2-Ways-Easy-naturally-sweetened-PERFECT-for-frosting-cakes-and-more-vegan-glutenfree-frosting-6-768x1152.jpg"
                  alt=""
                />
                <span className="text-center text-xl font-bold">
                  Cashew Buttercream Frosting (2 Ways!)
                </span>
              </div>
              <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-orange-400 text-xl font-bold">
                New Recipes
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="flex grow flex-col items-center gap-2">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2020/05/CREAMY-Mango-Lassi-Smoothie-5-ingredients-5-minutes-SO-delicious-mango-smoothie-plantbased-glutenfree-recipe-minimalistbaker-13-768x1152.jpg"
                  alt=""
                />
                <span className="text-center text-xl font-bold">
                  Creamy Vegan Mango Lassi
                </span>
              </div>
              <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-orange-400 text-xl font-bold">
                New Recipes
              </div>
            </div>
          </div>
          <div className="mt-5 flex cursor-pointer justify-center gap-1">
            <span className="font-semibold uppercase text-orange-400">
              Show me everything
            </span>
            <ArrowLongRightIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="mx-auto mb-10 h-[500px] max-w-[1200px] bg-[#fbf8f3] shadow-lg">
        <div className="grid h-full grid-cols-2 gap-5">
          <div className="flex h-full flex-col items-center justify-center px-10">
            <span className="mb-10 text-xl uppercase">pick of the week</span>
            <span className="mb-5 text-center text-5xl font-bold">
              Chocolate Chocolate Chip Pancakes (GF)
            </span>
            <p className="mb-8 text-center">
              Fluffy chocolate chocolate chip pancakes made in 20 minutes with
              wholesome ingredients. The perfect vegan, gluten-free, naturally
              sweetened breakfast!
            </p>
            <div className="flex h-16 w-48 cursor-pointer items-center justify-center rounded-sm border-2 border-solid border-black text-lg font-semibold uppercase hover:border-[#ffded6] hover:bg-[#ffded6]">
              view recipe
            </div>
          </div>
          <div className="relative h-full">
            <img
              src="https://minimalistbaker.com/wp-content/uploads/2017/07/AMAZING-Chocolate-Chocolate-Chip-Pancakes-20-minutes-naturally-sweetened-SO-fluffy-vegan-glutenfree-breakfast-chocolate-pancakes-recipe-5-600x900.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto mb-10 flex max-w-[1200px] gap-5 bg-green-800 p-8">
        <span className="flex-1 items-center text-3xl font-bold text-[#ffded6]">
          *Want more deliciousness?
        </span>
        <p className="flex w-[40%] items-center text-lg font-semibold text-white">
          Subscribe here and we’ll send you an email as new recipes are
          published AND our fan favorites ebook!
        </p>
        <div className="flex w-[33%] items-center">
          <Input
            type="email"
            className="h-[85%] rounded-none border-none pl-7 text-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Email Address..."
          />
          <div className="flex h-[85%] items-center justify-center bg-[#ffded6] px-4 uppercase hover:bg-[#ffb5a3]">
            submit
          </div>
        </div>
      </div>
      <div className="mb-10 bg-[#fbf8f3] pb-16 pt-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 w-[70%]">
            <div className="mb-10 flex h-16 w-full items-center justify-center bg-white">
              <div className="ml-2 flex h-14 w-14 items-center justify-center">
                <AdjustmentsHorizontalIcon className="h-6 w-6" />
              </div>
              <Input
                type="text"
                placeholder="What would you like to cook?"
                className="rounded-none border-none placeholder:uppercase focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="mr-2 flex h-14 w-16 items-center justify-center rounded-md bg-[#ffded6]">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="h-[1px] bg-black" />
            <div>
              <div className="flex justify-between pt-10">
                <span className="text-3xl font-bold uppercase">
                  recent reader favorites
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Image
                      src="/svg/star.svg"
                      alt="Star"
                      width={25}
                      height={25}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <HorizontalCard
                  title="Spicy Garlicky Sesame Tofu (30 Minutes!)"
                  ImageSource="https://minimalistbaker.com/wp-content/uploads/2023/12/Spicy-Garlicky-Sticky-Baked-Sesame-Tofu-10-600x600.jpg"
                  index={1}
                />
                <HorizontalCard
                  title="Spicy Garlicky Sesame Tofu (30 Minutes!)"
                  ImageSource="https://minimalistbaker.com/wp-content/uploads/2023/12/Spicy-Garlicky-Sticky-Baked-Sesame-Tofu-10-600x600.jpg"
                  index={2}
                />
                <HorizontalCard
                  title="Spicy Garlicky Sesame Tofu (30 Minutes!)"
                  ImageSource="https://minimalistbaker.com/wp-content/uploads/2023/12/Spicy-Garlicky-Sticky-Baked-Sesame-Tofu-10-600x600.jpg"
                  index={3}
                />
                <HorizontalCard
                  title="Spicy Garlicky Sesame Tofu (30 Minutes!)"
                  ImageSource="https://minimalistbaker.com/wp-content/uploads/2023/12/Spicy-Garlicky-Sticky-Baked-Sesame-Tofu-10-600x600.jpg"
                  index={4}
                />
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-black" />
          <div className="pt-10">
            <div className="flex justify-between">
              <span className="text-3xl font-bold uppercase">
                recipe round-ups
              </span>
              <div className="flex cursor-pointer gap-1">
                <span className="font-semibold uppercase">
                  Show me everything
                </span>
                <ArrowLongRightIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5 pt-10">
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2021/05/FLUFFY-Millet-Breakfast-Cake-with-Stone-Fruit-Gluten-free-plant-based-naturally-sweetened-adaptable-by-the-season-minimalistbaker-recipe-plantbased-glutenfree-millet-cake-8-768x1152.jpg"
                  alt=""
                  className="cursor-pointer"
                />
                <span className="cursor-pointer text-center text-xl font-bold hover:text-[#d56638]">
                  32 Plant-Based Mother’s Day Brunch Recipes
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2021/05/FLUFFY-Millet-Breakfast-Cake-with-Stone-Fruit-Gluten-free-plant-based-naturally-sweetened-adaptable-by-the-season-minimalistbaker-recipe-plantbased-glutenfree-millet-cake-8-768x1152.jpg"
                  alt=""
                  className="cursor-pointer"
                />
                <span className="cursor-pointer text-center text-xl font-bold hover:text-[#d56638]">
                  32 Plant-Based Mother’s Day Brunch Recipes
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2021/05/FLUFFY-Millet-Breakfast-Cake-with-Stone-Fruit-Gluten-free-plant-based-naturally-sweetened-adaptable-by-the-season-minimalistbaker-recipe-plantbased-glutenfree-millet-cake-8-768x1152.jpg"
                  alt=""
                  className="cursor-pointer"
                />
                <span className="cursor-pointer text-center text-xl font-bold hover:text-[#d56638]">
                  32 Plant-Based Mother’s Day Brunch Recipes
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://minimalistbaker.com/wp-content/uploads/2021/05/FLUFFY-Millet-Breakfast-Cake-with-Stone-Fruit-Gluten-free-plant-based-naturally-sweetened-adaptable-by-the-season-minimalistbaker-recipe-plantbased-glutenfree-millet-cake-8-768x1152.jpg"
                  alt=""
                  className="cursor-pointer"
                />
                <span className="cursor-pointer text-center text-xl font-bold hover:text-[#d56638]">
                  32 Plant-Based Mother’s Day Brunch Recipes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
