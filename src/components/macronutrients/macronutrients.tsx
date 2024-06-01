import { Tabs } from "@mantine/core";
import { MacronutrientsForGoals } from "../../common/types/response/health-metric-tdee";
import { numberWithCommas } from "../../utils/numberCommasFormat";

type MacronutrientsProps = {
  tdee: number;
  macronutrients: MacronutrientsForGoals;
};

export function Macronutrients({ tdee, macronutrients }: MacronutrientsProps) {
  return (
    <div className="mb-10">
      <Tabs defaultValue="maintenance">
        <Tabs.List>
          <Tabs.Tab value="maintenance">Maintenance</Tabs.Tab>
          <Tabs.Tab value="cutting">Cutting</Tabs.Tab>
          <Tabs.Tab value="bulking">Bulking</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="maintenance">
          <div className="mt-3 flex flex-col">
            <span className="mb-5">
              Những giá trị dinh dưỡng đa lượng phản ánh lượng calo để duy trì
              cân nặng của bạn là <strong>{numberWithCommas(tdee)}</strong> calo
              mỗi ngày.
            </span>
            <div className="mx-10 mt-2 flex justify-between">
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.moderateCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.moderateCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.moderateCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Moderate Carb (30/35/35)
                  </span>
                </div>
              </div>
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.lowerCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.lowerCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.lowerCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Lower Carb (40/40/20)
                  </span>
                </div>
              </div>
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.moderateCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.moderateCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.moderateCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Higher Carb (30/20/50)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="cutting">
          <div className="mt-3 flex flex-col">
            <span className="mb-5">
              Những giá trị dinh dưỡng đa lượng phản ánh lượng calo khi bạn siết
              cơ (giảm cân) là <strong>{numberWithCommas(tdee - 500)}</strong>{" "}
              calo mỗi ngày. Tức là mức thâm hụt 500 calo mỗi ngày so với lượng
              calo cần thiết để duy trì cân nặng của bạn là{" "}
              <strong>{numberWithCommas(tdee)}</strong> calo mỗi ngày.
            </span>
            <div className="mx-10 mt-2 flex justify-between">
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.moderateCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.moderateCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.moderateCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Moderate Carb (30/35/35)
                  </span>
                </div>
              </div>
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.lowerCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.lowerCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.lowerCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Lower Carb (40/40/20)
                  </span>
                </div>
              </div>
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.moderateCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.moderateCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.moderateCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Higher Carb (30/20/50)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="bulking">
          <div className="mt-3 flex flex-col">
            <span className="mb-5">
              Những giá trị dinh dưỡng đa lượng phản ánh lượng calo cần để tăng
              cân là <strong>{numberWithCommas(tdee + 500)}</strong> calo mỗi
              ngày. Tức là tăng 500 calo mỗi ngày so với lượng calo cần thiết để
              duy trì cân nặng của bạn là{" "}
              <strong>{numberWithCommas(tdee)}</strong> calo mỗi ngày.
            </span>
            <div className="mx-10 mt-2 flex justify-between">
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.moderateCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.moderateCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.moderateCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Moderate Carb (30/35/35)
                  </span>
                </div>
              </div>
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.lowerCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.lowerCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.lowerCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Lower Carb (40/40/20)
                  </span>
                </div>
              </div>
              <div className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200">
                <div className="flex w-72  flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.moderateCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.moderateCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.moderateCarbs.carbs,
                    )}g`}
                  </span>
                  <span>carbs</span>
                </div>

                <div className="absolute -top-[17px] flex h-fit items-center rounded-t-md bg-[#ed8537] px-1">
                  <span className="text-[11px] font-semibold text-white">
                    Higher Carb (30/20/50)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
