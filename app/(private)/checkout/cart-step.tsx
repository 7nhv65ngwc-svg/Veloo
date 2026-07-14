"use client";

import { QuantitySelector } from "@/app/(public)/components/quantity-selector";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
import { useCheckout } from "@/app/contexts/checkout.context";
import { CATEGORIES } from "@/app/mocks/categories";

interface IProductCart {
  id: string | number;
  name: string;
  photo: string;
  amount: number;
  price: number;
  categoryID: string | number;
}

function Item({ data }: { data: IProductCart }) {
  const { add, remove } = useCart();

  const handleAmountChange = (newAmount: number) => {
    if (newAmount > data.amount) {
      add({ ...data, amount: 1 });
    } else if (newAmount < data.amount) {
      remove({ ...data, amount: 1 });
    }
  };

  return (
    <div className="flex flex-row gap-4 items-center justify-between w-full">
      <div className="flex flex-row gap-4 items-center">
        <Image
          alt={data.name}
          src={data.photo}
          height={72}
          width={72}
          size={55}
        />
        <div className="flex flex-col gap-1">
          <div className="font-bold text-slate-800 text-sm leading-tight max-w-[220px]">
            {data.name}
          </div>
          <div className="text-xs text-slate-400">
            {CATEGORIES.find((cat) => cat.id === data.categoryID)?.name ||
              "Não identificado"}
          </div>
          <div className="mt-1">
            <QuantitySelector
              amount={data.amount}
              setAmount={(value: any) => handleAmountChange(Number(value))}
            />
          </div>
        </div>
      </div>

      <div className="font-bold text-lg text-slate-800 flex-shrink-0">
        {(data.price * data.amount).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    </div>
  );
}

interface Props {
  setStep: () => void;
}

export default function CartStep({ setStep }: Props) {
  const { cart } = useCheckout();

  return (
    <div className="p-4 flex flex-col gap-6 max-w-md mx-auto w-full items-center">
      <ul className="w-full flex flex-col gap-4">
        {cart?.products?.map((prd, i) => (
          <li key={prd.id ?? `product-${i}`} className="w-full">
            <Item data={prd as IProductCart} />
            {i < (cart?.products?.length ?? 0) - 1 && (
              <div className="border-b border-slate-100 my-4 w-full" />
            )}
          </li>
        ))}
      </ul>

      <div className="w-full max-w-[340px]">
        <button
          type="button"
          onClick={setStep}
          className="w-full bg-[#ea580c] hover:bg-black text-white font-sans text-sm font-medium py-2 rounded-lg transition-colors text-center block"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
