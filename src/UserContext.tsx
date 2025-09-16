import React, { useCallback, useEffect, useState } from "react";
import LoadingBars from "./frontend/components/LoadingBars/LoadingBars";
import { getCurrentUser } from "./api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  profileImage: string;
}

export interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  portfolioToken: string | null;
  setPortfolioToken: React.Dispatch<React.SetStateAction<string | null>>;
  refreshUser: () => Promise<void>;
  clearSession: () => void;
  loading: boolean;
}

export const UserContext = React.createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [portfolioToken, setPortfolioToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    setUser(null);
    setPortfolioToken(null);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
      setPortfolioToken(response.portfolioToken ?? null);
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [clearSession]);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (error) {
        // Ignore errors during initial load; user will remain signed out
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [fetchUser]);

  if (loading) {
    const bars = [
      { width: "300px", delay: "0s" },
      { width: "200px", delay: "0.2s" },
      { width: "300px", delay: "0.4s" },
    ];
    return <LoadingBars bars={bars} />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        portfolioToken,
        setPortfolioToken,
        refreshUser,
        clearSession,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
