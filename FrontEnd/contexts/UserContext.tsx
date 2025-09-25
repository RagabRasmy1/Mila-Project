"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/app/services/apiAuth";

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const refreshUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
