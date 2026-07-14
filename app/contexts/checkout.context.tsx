"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useCart } from "./cart.context";

interface IContext {
  cart: ICart;
  address: IAddres | null;
  setAddress: Dispatch<SetStateAction<IAddres | null>>;
  payment: {
    cardNumber: string;
    setCardNumber: Dispatch<SetStateAction<string>>;
    cardholder: string;
    setCardholder: Dispatch<SetStateAction<string>>;
    expirationDate: string;
    setExpirationDate: Dispatch<SetStateAction<string>>;
    cvv: string;
    setCvv: Dispatch<SetStateAction<string>>;
    document: string;
    setDocument: Dispatch<SetStateAction<string>>;
    installment: number;
    setInstallment: Dispatch<SetStateAction<number>>;
  };
  onCheckout: () => Promise<void>;
}

const Context = createContext<IContext>(null!);

interface IProps {
  children?: ReactNode;
}

export function CheckoutProvider({ children }: IProps) {
  const { cart } = useCart();
  const [address, setAddress] = useState<IAddres | null>(null);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardholder, setCardholder] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [installment, setInstallment] = useState<number>(1);

  const onCheckout = async () => {};

  return (
    <Context.Provider
      value={{
        cart,
        address,
        setAddress,
        payment: {
          cardNumber,
          setCardNumber,
          cardholder,
          setCardholder,
          expirationDate,
          setExpirationDate,
          cvv,
          setCvv,
          document,
          setDocument,
          installment,
          setInstallment,
        },
        onCheckout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCheckout() {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "O 'useCheckout' deve ser utilizado dentro do 'CheckoutProvider'",
    );
  return context;
}
