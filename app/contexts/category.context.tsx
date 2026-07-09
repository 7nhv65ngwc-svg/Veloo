"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ICategoryContext {
  data: Array<ICategory>;
  getOneById: (id: string) => ICategory | null;
}

const Context = createContext<ICategoryContext>(null!);

export function CategoryProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [data, setData] = useState<Array<ICategory>>([]);

  const getAll = async () => {
    try {
      const temp = await fetch("http://localhost:3001/categories").then((dt) =>
        dt.json(),
      );
      setData(temp);
    } catch {
      setData([]);
    }
  };

  const getOneById = (id: string): ICategory | null => {
    return data.find((dt) => dt.id === id) || null;
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Context.Provider value={{ data, getOneById }}>{children}</Context.Provider>
  );
}

export function useCategory() {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "O 'useCategory' deve ser utilizado dentro do 'CategoryProvider'",
    );
  return context;
}
