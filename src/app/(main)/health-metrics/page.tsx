"use client";

import { EActivityLevel } from "../../../common/enums/ActivityLevel";
import { EGender } from "../../../common/enums/Gender";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  THealthMetricTDEEResponse,
  TMacronutrientsForGoals,
} from "../../../common/types/response/health-metric-tdee";
import { HealthMetricsForm } from "../../../components/form/HealthMetricsForm";
import { useForm } from "@mantine/form";
import { Button, NumberInput, Select, Table, TableData } from "@mantine/core";
import { useCalculateTDEEMutation } from "../../../mutation";
import { TDEECalculatorRequest } from "../../../common/types/request/health-metrics/TDEECalculator";
import { numberWithCommas } from "../../../utils/numberCommasFormat";
import { getBMIStatus } from "../../../utils/getBMIStatus";
import { Macronutrients } from "../../../components/macronutrients/macronutrients";
import { useHealthMetricsQuery } from "../../../queries";

type FormValues = {
  gender: EGender;
  age?: number;
  weight?: number;
  height?: number;
  activityLevel: EActivityLevel;
};

export default function HealthMetrics() {
  const calculateTDEEMutation = useCalculateTDEEMutation();
  const userHealthMetrics = useHealthMetricsQuery(1);

  const [healthMetricsResponse, setHealthMetricsResponse] = useState<
    THealthMetricTDEEResponse | null | undefined
  >(userHealthMetrics.data?.data);

  const form = useForm<FormValues>({
    initialValues: {
      gender: healthMetricsResponse
        ? (healthMetricsResponse?.gender as EGender)
        : EGender.MALE,
      age: healthMetricsResponse?.age,
      weight: healthMetricsResponse?.weight,
      height: healthMetricsResponse?.height,
      activityLevel: healthMetricsResponse
        ? (healthMetricsResponse?.activityLevel as EActivityLevel)
        : EActivityLevel.SEDENTARY,
    },
  });

  const handleSubmitForm = useCallback(async (values: FormValues) => {
    const result = await calculateTDEEMutation.mutateAsync(
      values as TDEECalculatorRequest,
    );

    setHealthMetricsResponse(result.data);
  }, []);

  useEffect(() => {
    form.setValues({
      gender: healthMetricsResponse?.gender as EGender,
      age: healthMetricsResponse?.age,
      weight: healthMetricsResponse?.weight,
      height: healthMetricsResponse?.height,
      activityLevel: healthMetricsResponse?.activityLevel as EActivityLevel,
    });
  }, [healthMetricsResponse]);

  const tdeeTableData: TableData = {
    body: [
      [
        "Tỷ lệ trao đổi chất cơ bản",
        `${healthMetricsResponse?.anotherTDEE.basalMetabolicRate} calo một ngày`,
      ],
      [
        "Ít vận động",
        `${healthMetricsResponse?.anotherTDEE.sedentary} calo một ngày`,
      ],
      [
        "Tập luyện nhẹ",
        `${healthMetricsResponse?.anotherTDEE.lightExercise} calo một ngày`,
      ],
      [
        "Tập luyện vừa",
        `${healthMetricsResponse?.anotherTDEE.moderateExercise} calo một ngày`,
      ],
      [
        "Tập luyện nặng",
        `${healthMetricsResponse?.anotherTDEE.heavyExercise} calo một ngày`,
      ],
      [
        "Vận động viên",
        `${healthMetricsResponse?.anotherTDEE.athlete} calo một ngày`,
      ],
    ],
  };

  const idealWeightTableData: TableData = {
    body: [
      [
        "Công thức G.J. Hamwi",
        `${healthMetricsResponse?.idealWeight.hamwi} kg`,
      ],
      [
        "Công thức B.J. Devine",
        `${healthMetricsResponse?.idealWeight.devine} kg`,
      ],
      [
        "Công thức J.D. Robinson",
        `${healthMetricsResponse?.idealWeight.robinson} kg`,
      ],
      [
        "Công thức D.R. Miller",
        `${healthMetricsResponse?.idealWeight.miller} kg`,
      ],
    ],
  };

  const bmiTableData: TableData = {
    body: [
      ["dưới 18.5", "Thiếu cân"],
      ["18.5 - 24.99", "Bình thường"],
      ["25 - 29.99", "Thừa cân"],
      ["Trên 30", "Béo phì"],
    ],
  };

  const idealWeight = useMemo(() => {
    if (!healthMetricsResponse) return;
    const values = Object.values(healthMetricsResponse?.idealWeight);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [healthMetricsResponse]);

  useEffect(() => {
    setHealthMetricsResponse(userHealthMetrics.data?.data);
  }, [userHealthMetrics.data]);

  return (
    <>
      {!healthMetricsResponse ? (
        <div className="mx-auto max-w-[1050px] rounded-xl border-[1px] py-10 shadow-lg">
          <HealthMetricsForm
            setHealthMetricTDEEResponse={setHealthMetricsResponse}
          />
        </div>
      ) : (
        <div className="mx-auto max-w-[1050px] rounded-xl border-[1px] p-5 shadow-lg">
          <div className="mb-5">
            <span className="text-3xl font-semibold">Thống Kê Của Bạn</span>
          </div>
          <div className="mb-5">
            <form onSubmit={form.onSubmit(handleSubmitForm)}>
              <div className="flex flex-wrap items-center">
                <span className="mr-2">Bạn là</span>
                <Select
                  className="mr-2 w-20"
                  data={[
                    {
                      value: EGender.MALE,
                      label: "Nam",
                    },
                    {
                      value: EGender.FEMALE,
                      label: "Nữ",
                    },
                  ]}
                  defaultValue={healthMetricsResponse?.gender}
                  key={form.key("gender")}
                  {...form.getInputProps("gender")}
                />
                <NumberInput
                  className="mr-2 w-[70px]"
                  key={form.key("age")}
                  {...form.getInputProps("age")}
                  defaultValue={healthMetricsResponse?.age}
                />
                <span className="pr-2">Tuổi,</span>

                <span className="mr-2">Cao</span>
                <NumberInput
                  className="mr-1 w-20"
                  key={form.key("height")}
                  {...form.getInputProps("height")}
                  defaultValue={healthMetricsResponse?.height}
                />
                <span className="mr-2">cm và nặng</span>
                <NumberInput
                  className="mr-1 w-20"
                  key={form.key("weight")}
                  {...form.getInputProps("weight")}
                  defaultValue={healthMetricsResponse?.weight}
                />
                <span className="mr-2">kg, với</span>
                <Select
                  className="mr-3 w-60"
                  data={[
                    {
                      value: EActivityLevel.SEDENTARY,
                      label: "Ít vận động (công việc văn phòng)",
                    },
                    {
                      value: EActivityLevel.LIGHTLY_EXERCISE,
                      label: "Tập luyện nhẹ (1-2 ngày/tuần)",
                    },
                    {
                      value: EActivityLevel.MODERATELY_EXERCISE,
                      label: "Tập luyện vừa phải (3-5 ngày/tuần)",
                    },
                    {
                      value: EActivityLevel.HEAVY_EXERCISE,
                      label: "Tập luyện nặng (6-7 ngày/tuần)",
                    },
                    {
                      value: EActivityLevel.ATHLETE,
                      label: "Vận động viên (2x mỗi ngày)",
                    },
                  ]}
                  key={form.key("activityLevel")}
                  {...form.getInputProps("activityLevel")}
                  defaultValue={healthMetricsResponse?.activityLevel}
                />
                <Button type="submit" color="orange">
                  <span>Tính toán lại</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="flex gap-10">
            <div className="flex w-fit flex-col items-center">
              <span className="mb-2 font-semibold">Lượng calo để duy trì</span>
              <div className="flex w-60 flex-col items-center rounded-xl bg-gray-200">
                <div className="flex flex-col items-center border-b-[1px] border-black py-9">
                  <span className="text-4xl font-bold">
                    {numberWithCommas(healthMetricsResponse?.tdee || 0)}
                  </span>
                  <span>calories một ngày</span>
                </div>
                <div className="flex flex-col items-center py-9">
                  <span className="text-4xl font-bold">
                    {numberWithCommas(healthMetricsResponse?.tdee || 0 * 7)}
                  </span>
                  <span>calories một tuần</span>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-5">
                Dựa vào số liệu trên, ước tính tốt nhất về lượng calo duy trì
                của bạn là{" "}
                <strong>
                  {numberWithCommas(healthMetricsResponse?.tdee || 0)}
                </strong>{" "}
                calo mỗi ngày dựa trên công thức Katch-McArdle. Bảng dưới đây
                cho thấy sự khác biệt nếu bạn chọn các cấp độ hoạt động khác
                nhau:
              </p>
              <div className="border-t-[1px]">
                <Table data={tdeeTableData} />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <div className=" flex flex-col">
              <span className="mb-2 text-lg font-semibold">{`Cân nặng lý tưởng: ${idealWeight?.min}-${idealWeight?.max} kg`}</span>
              <p className="mb-3">
                Cân nặng lý tưởng của bạn được{" "}
                <span className="underline">ước tính</span> là từ{" "}
                {`${idealWeight?.min} - ${idealWeight?.max} kg`} dựa trên các
                công thức khác nhau được liệt kê dưới đây. Những công thức này
                dựa trên chiều cao của bạn và đại diện cho mức trung bình, vì
                vậy đừng quá lo lắng nếu bạn không trùng khớp với số liệu này,{" "}
                <strong>đặc biệt nếu bạn tập tạ</strong>.
              </p>
              <div className="border-t-[1px]">
                <Table data={idealWeightTableData} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 text-lg font-semibold">{`Chỉ số BMI: ${healthMetricsResponse?.bmi}`}</span>
              <p>
                Chỉ số BMI của bạn là {healthMetricsResponse?.bmi}, với chỉ số
                này cho thấy bạn{" "}
                <strong>{getBMIStatus(healthMetricsResponse?.bmi || 0)}</strong>
              </p>
              <div className="mt-auto border-t-[1px]">
                <Table data={bmiTableData} />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div>
              <span className="mb-2 text-lg font-semibold">
                Chất dinh dưỡng đa lượng
              </span>
            </div>
            <div>
              <Macronutrients
                tdee={healthMetricsResponse?.tdee || 0}
                macronutrients={
                  healthMetricsResponse?.macronutrients as TMacronutrientsForGoals
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
