import { ResponseType, User } from "@/common/types";
import axiosClient from "@/lib/axiosClient";

export const login = async () => {
  const response = await axiosClient.post<ResponseType<User>>("auth/login");

  return response.data;
};
