import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IAuthContextData {
  user: IUser;
  loading: boolean;
  createAccount: (companyName: string, email: string) => void;
  clearUserData: () => void;
}

interface IUser {
  isSignedIn?: boolean;
  companyName?: string;
  email?: string;
}

const defaultData: IAuthContextData = {
  user: {},
  loading: true,
  createAccount() {},
  clearUserData() {}
};

export const AuthContext = createContext<IAuthContextData>(defaultData);

interface IAuthProviderProps {
  children: ReactNode;
}
export function AuthProvider({ children }: IAuthProviderProps) {
  const { getItem, setItem, clearItems } = useLocalStorage();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getItem("auth");
    if (data) {
      setUser(data);
    }
    setLoading(false);
  }, []);

  const createAccount = (companyName: string, email: string) => {
    setItem("auth", { companyName, email, isSignedIn: true });
    setUser({ companyName, email, isSignedIn: true });
  };

  const clearUserData = () => {
    clearItems();
    setUser({});
  };

  if (loading) {
    return <h1>carregando</h1>;
  }

  return (
    <AuthContext.Provider
      value={{ user, createAccount, clearUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
