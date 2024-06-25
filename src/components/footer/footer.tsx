import Image from "next/image";

export function Footer() {
  return (
    <footer className="sticky top-[100vh] mt-10 flex h-fit flex-col gap-4 bg-gray-50 px-7 py-9">
      <div className="flex w-full items-end justify-center">
        <a href="/">
          <Image
            src="/svg/healthy-meals-logo.svg"
            alt="logo"
            height={50}
            width={120}
          />
        </a>
        <span className="font-semibold text-[#687083]">
          Cùng có một cơ thể thật đẹp và sức khoẻ thật tốt nhé.
        </span>
      </div>
      <div>
        <ul className="flex items-center justify-center gap-10 font-semibold text-[#687083]">
          <li>
            <a href="/recipes">Công thức</a>
          </li>
          <li className="h-1.5 w-1.5 rounded-full bg-black"></li>
          <li>
            <a href="/meal-plans">Kế hoạch ăn uống</a>
          </li>
          <li className="h-1.5 w-1.5 rounded-full bg-black"></li>
          <li>
            <a href="/health-metrics">Tính lượng calo tiêu thụ trong ngày</a>
          </li>
        </ul>
      </div>
      <div className="my-5 flex w-full justify-center">
        <div className="h-[0.5px] w-[95%] bg-[#9aa2b1]"></div>
      </div>
    </footer>
  );
}
