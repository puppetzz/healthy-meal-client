import { Tabs } from "@mantine/core";
import {
  TMacronutrient,
  TMacronutrientsForGoals,
} from "../../common/types/response/health-metric-tdee";
import { numberWithCommas } from "../../utils/numberCommasFormat";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import { RecommendRecipesModal } from "../modals/RecommendRecipesModal";
import { useHealthMetricsQuery } from "../../queries";
import { ECarbsType } from "../../common/enums/CarbsType";
import {
  TDetailCaloriesOfMeals,
  THealthMetricsTarget,
} from "../../common/types/form/HealthMetricsTarget";
import { EGoal } from "../../common/enums/Goal";

type MacronutrientsProps = {
  tdee: number;
  macronutrients: TMacronutrientsForGoals;
};

type GoalType = "cutting" | "maintenance" | "bulking";

export function Macronutrients({ tdee, macronutrients }: MacronutrientsProps) {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { data: healthMetrics } = useHealthMetricsQuery(tdee);
  const [carbsType, setCarbsType] = useState<string>(ECarbsType.MODERATE_CARBS);
  const [goal, setGoal] = useState<string>(EGoal.MAINTENANCE);

  const calDetailMacronutrientPerMeal = useCallback(
    (calories: number, carbsType: ECarbsType) => {
      let macronutrient = {
        calories: calories,
        protein: 0,
        fat: 0,
        carbs: 0,
      };

      let proportion = {
        protein: 0.3,
        fat: 0.35,
        carbs: 0.35,
      };

      switch (carbsType) {
        case ECarbsType.LOWER_CARBS:
          proportion = {
            protein: 0.3,
            fat: 0.35,
            carbs: 0.35,
          };
          break;
        case ECarbsType.MODERATE_CARBS:
          proportion = {
            protein: 0.4,
            fat: 0.4,
            carbs: 0.2,
          };
          break;
        case ECarbsType.HIGHER_CARBS:
          proportion = {
            protein: 0.3,
            fat: 0.2,
            carbs: 0.5,
          };
          break;
      }

      macronutrient.protein = Math.round((calories * proportion.protein) / 4);
      macronutrient.fat = Math.round((calories * proportion.fat) / 9);
      macronutrient.carbs = Math.round((calories * proportion.carbs) / 4);
      return macronutrient;
    },
    [],
  );

  const healthMetricsForGoals: THealthMetricsTarget = useMemo(() => {
    let tdee = healthMetrics?.data.tdee || 0;
    const macronutrient: TMacronutrient = {
      protein:
        healthMetrics?.data.macronutrients.maintenance.moderateCarbs.protein ||
        0,
      fat:
        healthMetrics?.data.macronutrients.maintenance.moderateCarbs.fat || 0,
      carbs:
        healthMetrics?.data.macronutrients.maintenance.moderateCarbs.carbs || 0,
    };

    let detailCaloriesOfMeals: TDetailCaloriesOfMeals = {
      breakfast: calDetailMacronutrientPerMeal(
        healthMetrics?.data.mealCaloriesRecommendation.maintenance
          .threeMealPerDay[0] || 0,
        carbsType as ECarbsType,
      ),
      lunch: calDetailMacronutrientPerMeal(
        healthMetrics?.data.mealCaloriesRecommendation.maintenance
          .threeMealPerDay[1] || 0,
        carbsType as ECarbsType,
      ),
      dinner: calDetailMacronutrientPerMeal(
        healthMetrics?.data.mealCaloriesRecommendation.maintenance
          .threeMealPerDay[2] || 0,
        carbsType as ECarbsType,
      ),
    };

    if (healthMetrics) {
      if (goal === EGoal.CUTTING) {
        tdee = healthMetrics.data.tdee - 500;
      } else if (goal === EGoal.BULKING) {
        tdee = healthMetrics.data.tdee + 500;
      }

      const goalType = goal.toLowerCase() as GoalType;
      let carbsTypeData;

      switch (carbsType) {
        case ECarbsType.MODERATE_CARBS:
          carbsTypeData =
            healthMetrics.data.macronutrients[goalType].moderateCarbs;
          break;
        case ECarbsType.LOWER_CARBS:
          carbsTypeData =
            healthMetrics.data.macronutrients[goalType].lowerCarbs;
          break;
        case ECarbsType.HIGHER_CARBS:
          carbsTypeData =
            healthMetrics.data.macronutrients[goalType].higherCarbs;
          break;
        default:
          carbsTypeData = { carbs: 0, protein: 0, fat: 0 };
          break;
      }

      macronutrient.carbs = carbsTypeData.carbs || 0;
      macronutrient.protein = carbsTypeData.protein || 0;
      macronutrient.fat = carbsTypeData.fat || 0;

      const numberOfMeals = tdee < 1200 ? "3" : tdee < 2000 ? "4" : "5";

      switch (numberOfMeals) {
        case "3":
          detailCaloriesOfMeals.breakfast = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .threeMealPerDay[0] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.lunch = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .threeMealPerDay[1] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.dinner = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .threeMealPerDay[2] || 0,
            carbsType as ECarbsType,
          );
          break;
        case "4":
          detailCaloriesOfMeals.breakfast = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fourMealPerDay[0] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.lunch = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fourMealPerDay[1] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.dinner = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fourMealPerDay[2] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.snacks = [
            calDetailMacronutrientPerMeal(
              healthMetrics.data.mealCaloriesRecommendation[goalType]
                .fourMealPerDay[3] || 0,
              carbsType as ECarbsType,
            ),
          ];
          break;

        case "5":
          detailCaloriesOfMeals.breakfast = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fiveMealPerDay[0] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.lunch = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fiveMealPerDay[1] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.dinner = calDetailMacronutrientPerMeal(
            healthMetrics.data.mealCaloriesRecommendation[goalType]
              .fiveMealPerDay[2] || 0,
            carbsType as ECarbsType,
          );
          detailCaloriesOfMeals.snacks = [
            calDetailMacronutrientPerMeal(
              healthMetrics.data.mealCaloriesRecommendation[goalType]
                .fiveMealPerDay[3] || 0,
              carbsType as ECarbsType,
            ),
            calDetailMacronutrientPerMeal(
              healthMetrics.data.mealCaloriesRecommendation[goalType]
                .fiveMealPerDay[4] || 0,
              carbsType as ECarbsType,
            ),
          ];
          break;
      }
    }

    return {
      tdee,
      macronutrient,
      detailCaloriesOfMeals,
    };
  }, [healthMetrics, goal, carbsType, tdee]);

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
              <div
                className="relative w-fit rounded-b-xl rounded-tr-xl bg-gray-200"
                onClick={() => {
                  setCarbsType(ECarbsType.MODERATE_CARBS);
                  setGoal(EGoal.MAINTENANCE);
                  toggle();
                }}
              >
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
                      macronutrients.maintenance.higherCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.higherCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.maintenance.higherCarbs.carbs,
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
                      macronutrients.cutting.higherCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.higherCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.cutting.higherCarbs.carbs,
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
                      macronutrients.bulking.higherCarbs.protein,
                    )}g`}
                  </span>
                  <span>protein</span>
                </div>
                <div className="flex flex-col items-center border-b-[1px] border-black py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.higherCarbs.fat,
                    )}g`}
                  </span>
                  <span>fats</span>
                </div>
                <div className="flex flex-col items-center py-3">
                  <span className="text-2xl font-bold">
                    {`${numberWithCommas(
                      macronutrients.bulking.higherCarbs.carbs,
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

      <RecommendRecipesModal
        opened={opened}
        close={close}
        meal={1}
        healthMetricsForGoals={healthMetricsForGoals}
      />
    </div>
  );
}
