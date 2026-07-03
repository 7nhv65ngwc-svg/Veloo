"use client"

import { QuantitySelector } from "@/app/(public)/components/quantity-selector";
import { Button } from "@/app/components/button";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
import { CATEGORIES } from "@/app/mocks/categories";
import { useEffect, useState } from "react";

export default function Addresstep() {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Endereço</h2>

            <input placeholder="CEP" />
            <input placeholder="Rua" />
            <input placeholder="Número" />
        </div>
    );
}

function Item({ data }: { data: IProductCart }) {
    const { add, remove } = useCart()
    const [amount, setAmount] = useState(data.amount);

    useEffect(() => {
        if (amount > data.amount) {
            add({ ...data, amount: 1 })
        } else if (amount < data.amount) {
            remove({ ...data, amount: 1 })
        }
    }, [amount])


    return (
        <div className="flex flex-row gap-2">
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
                    <div className="text-xs text-slate-400">{CATEGORIES.find(cat => cat.id === data.categoryID)?.name || "Não identificado"}</div>
                    <QuantitySelector amount={amount} setAmount={setAmount} />
                </div>
                <div className="font-bold text-lg">{(data.price * data.amount).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
            </div>
        </div>
    )
}

interface Props {
    setStep: () => void;
}
export function CartStep({ setStep }: Props) {
    const { cart } = useCart();

    return (
        <div className="p-4">
            <ul>
                {
                    cart.products
                        .map((prd, i) => (
                            <li key={prd.id}>
                                <Item data={prd} />
                                {i < (cart.products.length - 1) && (<div className="border-b border-slate-200 my-2 w-1/2 self-center" />)}
                            </li>
                        ))
                }
            </ul>

            <Button onClick={setStep}>Próximo</Button>
        </div>
    );
}