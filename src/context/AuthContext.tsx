"use client";

import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";
import { StatusCodes } from "http-status-codes";
import { createContext, useContext, useEffect, useState } from "react";

import {
  auth,
  getCurrentUser,
  signInWithGoogle,
  firebaseSignOut,
} from "@/lib/firebase";

import { notifications } from "@mantine/notifications";

import { login } from "@/api/auth";
import { QueryKey } from "@/common/constants/queryKey";

type AuthContextType = {
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    data: user,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: [QueryKey.USER],
    queryFn: async () => {
      const user = await getCurrentUser();

      if (!user) {
        return null;
      }

      const loginResponse = await login();

      if (!loginResponse) {
        throw new Error("Login failed!");
      } else if (
        ![StatusCodes.OK, StatusCodes.CREATED].includes(loginResponse.status)
      ) {
        throw new Error("Login failed!");
      }

      return user;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      firebaseSignOut();
      notifications.show({
        title: "Error",
        message: error?.message || "An error occurred",
        color: "red",
      });
    }
  }, [isError, error]);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      refetch();
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInGoogle: signInWithGoogle,
        signOut: firebaseSignOut,
        user: user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
