"use client";
import Image from "next/image";

type LargeHorizontalCardProps = {
  imageSrc: string;
  category: string;
  title: string;
  rating: number;
  numberOfComments: number;
};

export const LargeHorizontalCard = ({
  imageSrc,
  category,
  title,
  rating,
  numberOfComments,
}: LargeHorizontalCardProps) => {
  return (
    <div className="grid h-full grid-cols-2 gap-5">
      <div>
        <img src={imageSrc} alt="" />
      </div>
      <div>
        <span className="uppercase">featured recipe</span>
        <span>{category}</span>
        <h2>{title}</h2>
        <div>
          <div className="flex gap-1">
            {[...Array(rating)].map((_, index) => (
              <Image src="/svg/star.svg" alt="Star" width={25} height={25} />
            ))}
          </div>
          <span>{`${rating}.0`}</span>
          <span>{`(${numberOfComments} reviews)`}</span>
        </div>
      </div>

      <div></div>
      <div></div>
    </div>
  );
};
