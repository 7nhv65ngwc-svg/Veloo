import { CategoryProvider } from "@/app/contexts/category.context";
import { CheckoutProvider } from "@/app/contexts/checkout.context";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
