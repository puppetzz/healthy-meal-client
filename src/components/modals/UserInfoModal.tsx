"use client";

import {
  Button,
  Group,
  Modal,
  NumberInput,
  Radio,
  Select,
} from "@mantine/core";
import { EActivityLevel } from "../../common/enums/ActivityLevel";
import { EGender } from "../../common/enums/Gender";
import { EGoal } from "../../common/enums/Goal";
import { useForm } from "@mantine/form";
import { useUserInformationMutation } from "../../mutation/userUserInfomation";
import { notifications } from "@mantine/notifications";

type UserInfoModalProps = {
  opened: boolean;
  close: () => void;
};

export function UserInfoModal({ opened, close }: UserInfoModalProps) {
  const form = useForm({
    initialValues: {
      gender: EGender.MALE,
      age: 0,
      weight: 0,
      height: 0,
      activityLevel: EActivityLevel.SEDENTARY,
      goal: EGoal.MAINTENANCE,
    },
    validate: {
      age: (value) => (value === 0 ? "Tuổi không hợp lệ" : null),
      weight: (value) => (value === 0 ? "Tuổi không hợp lệ" : null),
      height: (value) => (value === 0 ? "Tuổi không hợp lệ" : null),
    },
  });

  const userInformationMutation = useUserInformationMutation();

  const handleSubmit = (values: typeof form.values) => {
    userInformationMutation.mutate({
      weight: values.weight,
      height: values.height,
      age: values.age,
      gender: values.gender,
      activityLevel: values.activityLevel,
      goal: values.goal,
    });

    notifications.show({
      title: "Cập Nhật Thông Tin Người Dùng",
      color: "green",
      message: "Cập nhật thông tin người dùng thành công.",
    });

    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Nhập Thông tin"
        size="xl"
        top={30}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="flex w-full justify-center">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <span className="flex w-40 justify-end font-semibold">
                  Giới tính
                </span>
                <Radio.Group
                  key={form.key("gender")}
                  {...form.getInputProps("gender")}
                >
                  <Group>
                    <Radio label="Nam" value={EGender.MALE} color="orange" />
                    <Radio label="Nữ" value={EGender.FEMALE} color="orange" />
                  </Group>
                </Radio.Group>
              </div>

              <div className="flex items-center gap-5">
                <span className="flex w-40 justify-end font-semibold">
                  Tuổi
                </span>
                <NumberInput
                  className="w-32"
                  required
                  placeholder="Tuổi của bạn"
                  key={form.key("age")}
                  {...form.getInputProps("age")}
                />
              </div>

              <div className="flex items-center gap-5">
                <span className="flex w-40 justify-end font-semibold">
                  Cân nặng
                </span>
                <NumberInput
                  className="w-32"
                  placeholder="kg"
                  required
                  key={form.key("weight")}
                  {...form.getInputProps("weight")}
                />
              </div>

              <div className="flex items-center gap-5">
                <span className="flex w-40 justify-end font-semibold">
                  Chiều cao
                </span>
                <NumberInput
                  className="w-32"
                  placeholder="cm"
                  required
                  key={form.key("height")}
                  {...form.getInputProps("height")}
                />
              </div>

              <div className="flex items-center gap-5">
                <span className="flex w-40 justify-end font-semibold">
                  Vận động
                </span>
                <Select
                  className="w-72"
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
                />
              </div>
              <div className="flex items-center gap-5">
                <span className="flex w-40 justify-end font-semibold">
                  Mục tiêu của bạn
                </span>
                <Select
                  className="w-44"
                  data={[
                    {
                      value: EGoal.CUTTING,
                      label: "Giảm cân",
                    },
                    {
                      value: EGoal.MAINTENANCE,
                      label: "Duy trì cân nặng",
                    },
                    {
                      value: EGoal.BULKING,
                      label: "Tăng cân",
                    },
                  ]}
                  key={form.key("goal")}
                  {...form.getInputProps("goal")}
                />
              </div>
              <div className="flex gap-5">
                <div className="w-40"></div>
                <Button color="orange" type="submit">
                  Hoàn Tất
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
