"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ICart {
  products: IProductCart[];
  total: number;
}
interface IPaymentState {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardholder: string;
  setCardholder: (value: string) => void;
  expirationDate: string;
  setExpirationDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  document: string;
  setDocument: (value: string) => void;
  installment: number;
  setInstallment: (value: number) => void;
}

interface ICartContextType {
  cart: ICart;
  add: (product: IProductCart) => void;
  remove: (product: IProductCart) => void;
  clearCart: () => void;
  payment: IPaymentState;
}

const CartContext = createContext<ICartContextType>(null!);

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cart, setCart] = useState<ICart>({
    products: [],
    total: 0,
  });

  const [cardNumber, setCardNumber] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [document, setDocument] = useState("");
  const [installment, setInstallment] = useState(1);

  const payment: IPaymentState = {
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
  };

  const clearCart = () => {
    setCart({
      products: [],
      total: 0,
    });
  };

  const add = (product: IProductCart) => {
    const oldProduct = cart.products.find((prd) => prd.id === product.id);

    if (!oldProduct) {
      const products = [...cart.products, product];
      const total = products.reduce((prev, curr) => {
        return prev + curr.amount * curr.price;
      }, 0);

      setCart({
        products,
        total,
      });
    } else {
      const newProduct: IProductCart = {
        ...oldProduct,
        amount: oldProduct.amount + product.amount,
      };

      const products = cart.products.map((prd) => {
        if (prd.id === newProduct.id) return newProduct;
        return prd;
      });

      setCart({
        products,
        total: products.reduce((prev, curr) => {
          return prev + curr.amount * curr.price;
        }, 0),
      });
    }
  };

  const remove = (product: IProductCart) => {
    const oldProduct = cart.products.find((prd) => prd.id === product.id);

    if (oldProduct) {
      if (product.amount >= oldProduct.amount) {
        const products = cart.products.filter(
          (prd) => prd.id !== oldProduct.id,
        );
        const total = products.reduce(
          (prev, curr) => prev + curr.amount * curr.price,
          0,
        );
        setCart({
          products,
          total,
        });
      } else {
        const products = cart.products.map((prd) => {
          if (prd.id === oldProduct.id) {
            return {
              ...prd,
              amount: prd.amount - product.amount,
            };
          }
          return prd;
        });
        const total = products.reduce(
          (prev, curr) => prev + curr.amount * curr.price,
          0,
        );
        setCart({
          products,
          total,
        });
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, clearCart, payment }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("O 'useCart' deve ser utilizado dentro do 'CartProvider'");
  return context;
}

export function useCheckout() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "O 'useCheckout' deve ser utilizado dentro do 'CartProvider'",
    );

  return {
    cart: context.cart,
    payment: context.payment,
  };
}
