type HorizontalCardProps = {
  title: string;
  ImageSource: string;
  index: number;
};

export function HorizontalCard({
  title,
  ImageSource,
  index,
}: HorizontalCardProps) {
  return (
    <>
      <div className="flex w-full cursor-pointer items-center bg-white">
        <div className="relative h-[130px] w-[130px]">
          <img
            src={ImageSource}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute -right-[14px] top-1/2 h-7 w-7 -translate-y-1/2 transform rounded-[50%] bg-white"></span>
        </div>
        <span className="px-8 py-4 text-4xl font-bold">
          {index < 10 ? `0${index}` : index}
        </span>
        <span className="text-xl">{title}</span>
      </div>
    </>
  );
}
