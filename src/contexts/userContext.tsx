import React, { createContext, FC, useCallback, useMemo } from "react";

interface User {
  id: string;
  username: string;
  sessionId: string;
  roles: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const hasRole = useCallback((role: string) => user?.roles.includes(role) ?? false, [user]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated,
      hasRole,
      logout,
    }),
    [user, setUser, isAuthenticated, hasRole, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
