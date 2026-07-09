"use client";

import { QuantitySelector } from "@/app/(public)/components/quantity-selector";
import { Button } from "@/app/components/button";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
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
    <div className="flex flex-row gap-2 items-center">
      <Image
        alt={data.name}
        src={data.photo}
        height={72}
        width={72}
        size={55}
      />
      <div className="flex-1 flex flex-row items-center justify-between">
        <div>
          <div className="font-bold">{data.name}</div>
          <div className="text-xs text-slate-400">
            {CATEGORIES.find((cat) => cat.id === data.categoryID)?.name ||
              "Não identificado"}
          </div>

          <QuantitySelector
            amount={data.amount}
            setAmount={(value: any) => handleAmountChange(Number(value))}
          />
        </div>
        <div className="font-bold text-lg">
          {(data.price * data.amount).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
  );
}

interface Props {
  setStep: () => void;
}

export default function CartStep({ setStep }: Props) {
  const { cart } = useCart();

  return (
    <div className="p-4">
      <ul className="flex flex-col gap-2">
        {cart?.products?.map((prd, i) => (
          <li key={prd.id ?? `product-${i}`}>
            <Item data={prd as IProductCart} />
            {i < (cart?.products?.length ?? 0) - 1 && (
              <div className="border-b border-slate-200 my-2 w-1/2 mx-auto" />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Button onClick={setStep}>Próximo</Button>
      </div>
    </div>
  );
}
