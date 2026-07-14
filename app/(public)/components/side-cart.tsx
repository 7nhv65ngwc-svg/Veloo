"use client";

import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
import { CATEGORIES } from "@/app/mocks/categories";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { QuantitySelector } from "./quantity-selector";
import Link from "next/link";

interface IPropsItem {
  data: IProductCart;
}

function Item({ data }: IPropsItem) {
  const { add, remove } = useCart();
  const [amount, setAmount] = useState(data.amount);

  useEffect(() => {
    if (amount > data.amount) {
      add({ ...data, amount: 1 });
    } else if (amount < data.amount) {
      remove({ ...data, amount: 1 });
    }
  }, [amount]);
  
  return (
    <div className="flex flex-row gap-1.5">
      <Image
        alt={data.name}
        src={data.photo}
        height={32}
        width={32}
        size={30}
      />
      <div className="flex-1">
        <div className="flex flex-row items-center justify-between">
          <div>
            <div className="text-xs font-bold">{data.name}</div>
            <div className="text-[8px] text-slate-500">
              {CATEGORIES.find((ct) => ct.id === data.categoryID)?.name ||
                "Não identificada"}
            </div>
          </div>
          <button
            onClick={() => remove(data)}
            className="cursor-pointer bg-red-200 text-red-600 h-5 w-5 rounded-md flex items-center justify-center"
          >
            <IoTrash size={12} />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <QuantitySelector amount={amount} setAmount={setAmount} height={6} />
          <div className="text-[12px] flex flex-row gap-px font-bold text-[#012E40]">
            <div className="text-[8px]">R$</div>
            {(data.price * data.amount).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function SideCart({ show, setShow }: IProps) {
  const { cart } = useCart();

  return (
    <aside
      className={`z-40 absolute inset-y-0 right-0 bg-white shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${show ? "w-50" : "w-0 overflow-hidden"}`}
    >
      <div className="relative h-full">
        {show && (
          <button
            onClick={() => setShow(false)}
            className="absolute -left-3 top-2 bg-red-600 flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[BLACK] shadow-lg"
          >
            <IoClose />
          </button>
        )}

        <div className="h-[calc(100%-72px)] w-full py-2 overflow-y-auto flex flex-col gap-2">
          <ul className="p-2 pt-6 flex flex-col gap-2">
            <label className="text-xs font-bold">Carrinho</label>
            {cart.products.map((product) => (
              <li key={`cart-${product.id}`}>
                <Item data={product} />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[BLACK] overflow-hidden h-18 w-full text-white p-2">
          <div className="text-right text-lg font-bold flex flex-row justify-end gap-2">
            <div className="text-[10px]">R$</div>
            {cart.total.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          {(cart.total > 0 || cart.products.length > 0) && (
            <Link
              href={"/checkout"}
              className="bg-red-600 p-2 rounded-lg text-[10px] w-full"
            >
              Finalizar
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
