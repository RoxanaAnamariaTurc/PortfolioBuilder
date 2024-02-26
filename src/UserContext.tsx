import React from "react";

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
