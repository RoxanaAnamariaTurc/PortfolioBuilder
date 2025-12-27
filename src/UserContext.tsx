import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "./types";

export interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextProps | undefined>(
  undefined
);

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getPortfolioToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("portfolioToken") : null;

export const getUserQueryKey = (token: string | null): QueryKey => [
  "user",
  token ?? "guest",
];

export const useUserQuery = () => {
  const token = getPortfolioToken();
  const hasToken = Boolean(token);

  return useQuery<User | null, Error>({
    queryKey: getUserQueryKey(token),
    queryFn: async () => {
      if (!hasToken || !token) {
        return null;
      }

      const response = await axios.get(`${API_BASE_URL}/user/${token}`);
      return response.data.user as User;
    },
    enabled: hasToken,
    suspense: hasToken,
    placeholderData: () => null,
  });
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  const setUser = useCallback(
    (value: React.SetStateAction<User | null>) => {
      const token = getPortfolioToken();
      queryClient.setQueryData<User | null>(
        getUserQueryKey(token),
        (previous) =>
          typeof value === "function"
            ? (value as (prev: User | null) => User | null)(previous ?? null)
            : value
      );
    },
    [queryClient]
  );

  const contextValue = useMemo(
    () => ({
      user: user ?? null,
      setUser,
    }),
    [setUser, user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
