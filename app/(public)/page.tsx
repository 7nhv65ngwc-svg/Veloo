"use client"

import { FaCartPlus } from "react-icons/fa";
import { Card } from "../components/card";
import { CATEGORIES } from "../mocks/categories";
import { PRODUCTS } from "../mocks/products";
import { MdHideImage } from "react-icons/md";
import { useCart } from "../contexts/cart.context";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

function Item({ data }: { data: IProduct }) {
  const { add } = useCart();

  const category = CATEGORIES
    .find(ct => ct.id === data.categoryID);

  const onClick = () => {
    add({
      ...data,
      amount: 1
    })

    toast.success("Adicionado com sucesso!")
  }

  const href = category ? category.path.concat(`/${data.id}`) : `/${data.id}`

  return (
    <Card>
      <Link href={href} className="group transition-all ease-in-out duration-300">
        <div className="mb-2 text-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
          {
            data.photo ? <Image
              alt={data.name}
              src={data.photo}
              height={104}
              width={104}
            /> : <MdHideImage size={60} />
          }
        </div>
        <div>
          <div className="text-[12px] font-bold group-hover:text-[#ea580c]">{data.name}</div>
          <div className="text-[10px] text-slate-400 group-hover:text-[#ea580c]">
            {
              category?.name || "Não Identificado"
            }
          </div>
          <div className="text-md font-bold text-[#ea580c] group-hover:text-[black]">
            {
              data.price
                .toLocaleString("pt-br", {
                  style: "currency", currency: "BRL"
                })
            }
          </div>
        </div>
      </Link>
      <div className="flex justify-end mt-1.5">
        <button onClick={onClick} title="Adicionar" className="hover:bg-[#ea580c] h-8 w-8 bg-[black] text-white flex items-center justify-center rounded-md p-2 cursor-pointer">
          <FaCartPlus size={16} />
        </button>
      </div>
    </Card>
  )
}

export default function Page() {
  return (
    <>
      <section>
        <h2 className="font-bold text-lg text-[black]">Mais Vendidos</h2>
        <ul className="p-2 flex flex-row gap-2 items-center overflow-x-auto">
          {
            PRODUCTS.map((prd) => (
              <li key={`best-sellers-prd-${prd.id}`}>
                <Item data={prd} />
              </li>
            ))
          }
        </ul>
      </section>
    </>
  );
}