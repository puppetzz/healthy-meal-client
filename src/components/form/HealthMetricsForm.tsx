"use client";

import { Button, Group, NumberInput, Radio, Select } from "@mantine/core";
import { ActivityLevel } from "../../common/enums/ActivityLevel";
import { Gender } from "../../common/enums/Gender";
import { useForm } from "@mantine/form";
import { useCalculateTDEEMutation } from "../../mutation";
import { useCallback, useState } from "react";
import { HealthMetricTDEEResponse } from "../../common/types/response/health-metric-tdee";

type FormValues = {
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
};

type HealthMetricsFormProps = {
  setHealthMetricTDEEResponse: (response: HealthMetricTDEEResponse) => void;
};

export function HealthMetricsForm({
  setHealthMetricTDEEResponse,
}: HealthMetricsFormProps) {
  const form = useForm({
    initialValues: {
      gender: Gender.MALE,
      age: undefined,
      weight: undefined,
      height: undefined,
      activityLevel: ActivityLevel.SEDENTARY,
    },
    validate: {
      age: (value) =>
        !!value && value < 0 ? "Age must be greater than 0" : null,
      weight: (value) =>
        !!value && value < 0 ? "Weight must be greater than 0" : null,
      height: (value) =>
        !!value && value < 0 ? "Height must be greater than 0" : null,
    },
  });

  const calculateTDEEMutation = useCalculateTDEEMutation();

  const handleSummitForm = useCallback(async (values: FormValues) => {
    const result = await calculateTDEEMutation.mutateAsync(values);
    setHealthMetricTDEEResponse(result.data);
  }, []);

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-5 flex items-center justify-center">
        <h1 className="flex items-center text-center text-3xl font-bold">
          TÌM HIỂU XEM BẠN ĐỐT CHÁY <br /> BAO NHIÊU CALORIES TRONG MỘT NGÀY
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={form.onSubmit((values) => {
            handleSummitForm(values as unknown as FormValues);
          })}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <span className="flex w-28 justify-end font-semibold">
                Giới tính
              </span>
              <Radio.Group
                key={form.key("gender")}
                {...form.getInputProps("email")}
                defaultValue={form.getValues().gender}
              >
                <Group>
                  <Radio label="Male" value={Gender.MALE} color="orange" />
                  <Radio label="Female" value={Gender.FEMALE} color="orange" />
                </Group>
              </Radio.Group>
            </div>

            <div className="flex items-center gap-5">
              <span className="flex w-28 justify-end font-semibold">Tuổi</span>
              <NumberInput
                className="w-32"
                key={form.key("age")}
                {...form.getInputProps("age")}
                required
              />
            </div>

            <div className="flex items-center gap-5">
              <span className="flex w-28 justify-end font-semibold">
                Cân nặng
              </span>
              <NumberInput
                className="w-32"
                placeholder="kg"
                key={form.key("weight")}
                {...form.getInputProps("weight")}
                required
              />
            </div>

            <div className="flex items-center gap-5">
              <span className="flex w-28 justify-end font-semibold">
                Chiều cao
              </span>
              <NumberInput
                className="w-32"
                placeholder="cm"
                key={form.key("height")}
                {...form.getInputProps("height")}
                required
              />
            </div>

            <div className="flex items-center gap-5">
              <span className="flex w-28 justify-end font-semibold">
                Vận động
              </span>
              <Select
                className="w-72"
                data={[
                  {
                    value: ActivityLevel.SEDENTARY,
                    label: "Ít vận động (công việc văn phòng)",
                  },
                  {
                    value: ActivityLevel.LIGHTLY_EXERCISE,
                    label: "Tập luyện nhẹ (1-2 ngày/tuần)",
                  },
                  {
                    value: ActivityLevel.MODERATELY_EXERCISE,
                    label: "Tập luyện vừa phải (3-5 ngày/tuần)",
                  },
                  {
                    value: ActivityLevel.HEAVY_EXERCISE,
                    label: "Tập luyện nặng (6-7 ngày/tuần)",
                  },
                  {
                    value: ActivityLevel.ATHLETE,
                    label: "Vận động viên (2x mỗi ngày)",
                  },
                ]}
                key={form.key("activityLevel")}
                {...form.getInputProps("activityLevel")}
              />
            </div>
            <div className="flex gap-5">
              <div className="w-28"></div>
              <Button color="orange" type="submit">
                Calculate!
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
