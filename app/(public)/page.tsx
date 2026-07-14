"use client";

import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { Card } from "../components/card";
import { CATEGORIES } from "../mocks/categories";
import { PRODUCTS } from "../mocks/products";
import { useCart } from "../contexts/cart.context";
import Link from "next/link";
import toast from "react-hot-toast";
import { Image } from "../components/image";

interface IProduct {
  id: number;
  name: string;
  categoryID: number;
  price: number;
  photo?: string;
}

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

  const handleFavoriteProduct = () => {
    toast.success("Favoritado com sucesso!");
  };

  const href = category ? category.path.concat(`/${data.id}`) : `/${data.id}`;

  return (
    <Card
      className="flex flex-col p-4 bg-white"
      style={{ width: 220, minHeight: 390 }}
    >
      <div className="flex-1 flex flex-col">
        <Link
          href={href}
          className="flex flex-col group transition-all ease-in-out duration-300"
        >
          <div className="w-full flex items-center justify-center mb-2">
            <Image
              alt={data.name}
              src={data.photo}
              height={104}
              width={180}
              size={60}
            />
          </div>
          <div>
            <div className="text-[13px] font-bold text-black mt-1 group-hover:text-[black]">
              {category?.name || "Não Identificado"}
            </div>

            <div className="text-[13px] font-bold min-h-10 line-clamp-2 group-hover:text-[black]">
              {data.name}
            </div>

            <div className="text-md font-bold text-red-600 mt-1 group-hover:text-red-600">
              {data.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-1.5 mt-3 w-full">
        <button
          type="button"
          onClick={onClick}
          className="w-full bg-black hover:bg-green-600 text-white text-center text-xs font-semibold py-2.5 rounded-md flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FaCartPlus size={12} />
          Adicionar
        </button>

        <button
          type="button"
          onClick={handleFavoriteProduct}
          className="w-full bg-black hover:bg-red-600 text-white text-center text-xs font-semibold py-2.5 rounded-md flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FaRegHeart size={12} />
          Favorito
        </button>
      </div>
    </Card>
  );
}

export default function Page() {
  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#012E40] via-[#024959] to-[#EA580C] py-5 px-4 relative overflow-hidden flex justify-start">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#EA580C]/20 blur-2xl pointer-events-none" />

        <div className="w-full max-w-6xl pl-2 text-left relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">
            O mundo de compras se encontra na Vello!
          </h2>
          <p className="text-sm md:text-base text-slate-100/90 font-medium max-w-2xl drop-shadow-sm">
            Conectamos você às melhores lojas e marcas. Tudo o que você procura,
            em um só lugar com a segurança que você merece.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mt-6">
        <h2 className="font-bold text-lg text-[#012E40] mb-4">Mais Vendidos</h2>
        <ul className="p-2 grid grid-cols-4 gap-4">
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
