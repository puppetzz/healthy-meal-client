import { useMutation } from "@tanstack/react-query";
import { UpdateUserInformationRequest } from "../common/types/request/user/UpdateUserInformation";
import { updateUserInformation } from "../api/user";

export const useUserInformationMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserInformationRequest) => {
      return await updateUserInformation(data);
    },
  });
};
