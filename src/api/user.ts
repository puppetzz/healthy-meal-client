import { API } from "../common/constants/api";
import { UpdateUserInformationRequest } from "../common/types/request/user/UpdateUserInformation";
import axiosClient from "../lib/axiosClient";

export const updateUserInformation = async (
  data: UpdateUserInformationRequest,
) => {
  const response = await axiosClient({
    url: API.HEALTH_METRICS,
    method: "POST",
    data,
  });

  return response.data;
};
