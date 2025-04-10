import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LoadingBars from "./frontend/components/LoadingBars/LoadingBars";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  jobTitle: string;
  profileImage: string;
}

export interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("portfolioToken");
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${token}`);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchUser();
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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
