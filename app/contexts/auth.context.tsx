"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: {
    [x: string]: string;
    id: string;
  } | null;
  logout: () => void;
}

const Context = createContext<IAuthContext>(null!);

export function AuthProvider({ children }: { children?: ReactNode }) {
  const [user, setUser] = useState<{ id: string } | null>(null);

  const getUser = async () => {
    try {
      const cookie = await cookieStore.get("user");
      if (cookie) {
        const { value } = cookie;

        const temp = value ? JSON.parse(decodeURIComponent(value)) : null;

        setUser(
          temp
            ? {
                id: temp["id"],
              }
            : null,
        );
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };
  const logout = async () => {
    await cookieStore.delete("user");
    getUser()
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Context.Provider value={{ user, logout }}>{children}</Context.Provider>
  );
}

export function useAuth() {
  const context = useContext(Context);
  if (!context)
    throw new Error("O 'useAuth' deve ser utilizado dentro do 'AuthProvider'");
  return context;
}
