import { ReactNode } from "react";
import { Header } from "./components/header";
import { AuthProvider } from "../contexts/auth.context";
import { CategoryProvider } from "../contexts/category.context";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<IProps>) {
  return (
    <CategoryProvider>
      <AuthProvider>
        <Header />
        <main className=" overflow-auto">{children}</main>
      </AuthProvider>
    </CategoryProvider>
  );
}
