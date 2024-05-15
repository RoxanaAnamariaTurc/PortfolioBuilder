import axios from "axios";
import React, { useEffect, useState } from "react";

export interface User {
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

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userID in UserProvider", userId);
    if (userId) {
      axios
        .get(`${API_BASE_URL}/user/${userId}`)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [API_BASE_URL]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
