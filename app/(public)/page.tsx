"use client";

import { FaCartPlus } from "react-icons/fa";
import { Card } from "../components/card";
import { CATEGORIES } from "../mocks/categories";
import { PRODUCTS } from "../mocks/products";
import { MdHideImage } from "react-icons/md";
import { useCart } from "../contexts/cart.context";
import Link from "next/link";
import toast from "react-hot-toast";
import { Image } from "../components/image";
import { Button } from "../components/button";

function Item({ data }: { data: IProduct }) {
  const { add } = useCart();

  const category = CATEGORIES.find((ct) => ct.id === data.categoryID);

  const onClick = () => {
    add({
      ...data,
      amount: 1,
    });

    toast.success("Adicionado com sucesso!");
  };

  const href = category ? category.path.concat(`/${data.id}`) : `/${data.id}`;

  return (
    <Card className="flex flex-col" style={{ width: 200, height: 200 * 1.48 }}>
      <div className="flex-1">
        <Link
          href={href}
          className="flex-1 group transition-all ease-in-out duration-300"
        >
          <Image
            alt={data.name}
            src={data.photo}
            height={104}
            width={180}
            size={60}
          />
          <div>
            <div className="text-[12px] font-bold group-hover:text-[#EA580C]">
              {data.name}
            </div>
            <div className="text-[10px] text-slate-400 group-hover:text-[#EA580C]">
              {category?.name || "Não Identificado"}
            </div>
            <div className="text-md font-bold text-[#ea580c] group-hover:text-[black]">
              {data.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        </Link>
      </div>
      <div className="bg-[#dc2626] flex-1 flex justify-end mt-1.5">
        <Button
          onClick={onClick}
          title="Adicionar"
          className=" h-8 w-8 bg-[black] text-white flex items-center justify-center rounded-md p-2 cursor-pointer"
        >
          <FaCartPlus size={16} />
        </Button>
      </div>
    </Card>
  );
}

export default function Page() {
  return (
    <>
      <section>
        <h2 className="font-bold text-lg text-[#012E40]">Mais Vendidos</h2>
        <ul className="p-2 grid grid-cols-4 bg-[#dc2626] gap-4 ">
          {PRODUCTS.map((prd) => (
            <li key={`best-sellers-prd-${prd.id}`}>
              <Item data={prd} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

