import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Input, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { ChangeEvent, useState } from "react";
import { IngredientInputField } from "../../common/types/form/IngredientInputField";

type IngredientFormProps = {
  inputFields: IngredientInputField[];
  setInputFields: (fields: IngredientInputField[]) => void;
  onAddField: () => void;
  onRemoveField: (index: number) => void;
  setMissingFields: (value: boolean) => void;
};

export function IngredientForm({
  inputFields,
  setInputFields,
  setMissingFields,
  onAddField,
  onRemoveField,
}: IngredientFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleFormChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    let data = [...inputFields];

    const name: keyof IngredientInputField = event.target
      .name as keyof IngredientInputField;

    data[index][name] = event.target.value;

    setInputFields(data);

    if (event.target.value !== "") {
      if (Object.keys.length < 1) {
        setMissingFields(false);
      }

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`${name}${index}`];
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${name}${index}`]: true,
      }));
    }
  };

  const handleBlur = (name: string, index: number, value: string) => {
    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${name}${index}`]: true,
      }));
    }
  };

  return (
    <div>
      <form>
        {inputFields.map((input, index) => (
          <div className="mt-5 flex items-center gap-3" key={index}>
            <TextInput
              name="name"
              className="w-3/5"
              placeholder="Tên thành phần"
              onChange={(event) => handleFormChange(index, event)}
              value={input.name}
              onBlur={() => handleBlur("name", index, input.name)}
              error={errors[`name${index}`]}
            />
            <TextInput
              name="description"
              className="w-3/5"
              placeholder="Mô tả chi tiết"
              onChange={(event) => handleFormChange(index, event)}
              value={input.description}
              error={errors[`description${index}`]}
            />
            <TextInput
              name="amount"
              className="w-1/6"
              placeholder="liều lượng"
              onChange={(event) => handleFormChange(index, event)}
              value={input.amount}
              onBlur={() => handleBlur("amount", index, input.amount)}
              error={errors[`amount${index}`]}
            />
            <TextInput
              name="unit"
              className="w-1/6"
              placeholder="đơn vị"
              onChange={(event) => handleFormChange(index, event)}
              value={input.unit}
              onBlur={() => handleBlur("unit", index, input.unit)}
              error={errors[`unit${index}`]}
            />
            <XMarkIcon
              className="h-7 w-7 cursor-pointer "
              onClick={() => {
                if (inputFields.length === 1) {
                  notifications.show({
                    title: "Không thể xoá thành phần",
                    message: "Công thức nấu ăn phải có ít nhất 1 thành phần",
                    color: "red",
                  });
                  return;
                }
                onRemoveField(index);
              }}
            />
          </div>
        ))}
      </form>
      <Button className="mt-4" onClick={onAddField} color="orange">
        Thêm
      </Button>
    </div>
  );
}
