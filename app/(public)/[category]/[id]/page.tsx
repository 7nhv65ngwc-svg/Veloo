"use client";

import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { CATEGORIES } from "@/app/mocks/categories";
import { PRODUCTS } from "@/app/mocks/products";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar, FaRegHeart } from "react-icons/fa";
import { MdHideImage } from "react-icons/md";
import { QuantitySelector } from "../../components/quantity-selector";
import { useState } from "react";
import { useCart } from "@/app/contexts/cart.context";
import { IoArrowRedoSharp } from "react-icons/io5";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState<number>(1);
  const { add } = useCart();

  if (isNaN(Number(id))) {
    toast.error("ID inválido!");
    return null;
  }

  const product = PRODUCTS.find((prd) => prd.id === Number(id));

  if (!product) {
    toast.error("Produto não encontrado!");
    return null;
  }

  const category = CATEGORIES.find((cat) => cat.id === product.categoryID);

  const handleAdd = () => {
    add({ ...product, amount });
    toast.success("Adicionado com sucesso!");
  };


  const handleFavoriteProduct = () => {
    if (typeof window !== "undefined") {
      try {
        const currentFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]",
        );
        const isAlreadyFavorite = currentFavorites.some(
          (fav: any) => fav.id === product.id,
        );

        if (!isAlreadyFavorite) {
          const updatedFavorites = [...currentFavorites, product];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          toast.success(`${product.name.substring(0, 20)}... favoritado!`);
        } else {
          toast.error("Este produto já está nos seus favoritos!");
        }
      } catch (error) {
        console.error("Erro ao salvar favorito:", error);
        toast.error("Não foi possível salvar nos favoritos.");
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-slate-200 rounded-xl h-full">
            <div className="w-full md:w-[400px] h-[400px] rounded-lg relative flex items-center justify-center bg-white border border-slate-100 flex-shrink-0 overflow-hidden">
              {product.photo ? (
                <Image
                  alt={product.name}
                  src={product.photo}
                  fill
                  priority
                  className="object-contain p-2"
                />
              ) : (
                <MdHideImage size={160} className="text-slate-300" />
              )}
            </div>

        
            <div className="flex-1 flex flex-col justify-start">
              <Link
                href={category?.path || "#"}
                className="text-slate-500 text-xs hover:underline font-medium"
              >
                {category?.name || "Não identificado"}
              </Link>

              <h1 className="font-bold text-2xl text-black leading-tight mt-1 mb-2">
                {product.name}
              </h1>

              <div className="flex flex-row items-center gap-1.5 mb-3">
                <span className="text-sm font-bold text-slate-800">
                  {product.rating}
                </span>
                <ul className="text-slate-300 flex flex-row items-center gap-px">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={`rating-${i}`}>
                      <FaStar
                        size={14}
                        className={
                          i + 1 <= product.rating
                            ? "text-amber-500"
                            : "text-slate-200"
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="font-bold text-3xl text-[#ea580c] my-2">
                {product.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>

              <div className="border-t border-slate-100 mt-4 pt-4">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Descrição
                </h3>
                <p className="text-black text-sm text-justify leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          
          <Card className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col gap-3">
            <div className="text-xs text-slate-500 font-medium">
              Quantidade disponível
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <QuantitySelector
                  height={9}
                  amount={amount}
                  setAmount={setAmount}
                />

                
                <button
                  type="button"
                  onClick={handleFavoriteProduct}
                  className="p-3 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 rounded-lg border border-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                  title="Salvar nos favoritos"
                >
                  <FaRegHeart size={18} />
                </button>
              </div>

              <Button
                onClick={handleAdd}
                className="w-full bg-[#ea580c] hover:!bg-black text-white text-xs font-bold py-3 px-6 rounded-md transition-colors flex flex-row items-center justify-center gap-2"
              >
                <FaCartPlus /> Adicionar ao carrinho
              </Button>
            </div>
          </Card>

          {/* CARD DO VENDEDOR */}
          <Card className="p-4 bg-white border border-slate-200 rounded-xl flex flex-row gap-3 items-center">
            <div className="relative h-12 w-12 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {product.photo ? (
                <Image
                  alt={product.name}
                  src={product.photo}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <MdHideImage size={24} className="text-slate-300" />
              )}
            </div>
            <div className="flex-1 flex flex-row items-center justify-between gap-2">
              <div>
                <div className="font-bold text-sm text-black">
                  Nome do Vendedor
                </div>
                <div className="text-slate-500 text-xs flex flex-row items-center gap-3 mt-0.5">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-700">5</span>
                    <FaStar className="text-amber-500" size={11} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700">5</span> Produtos
                  </div>
                </div>
              </div>
              <Link
                href={`/seller/${product.sellerID}`}
                className="bg-black hover:bg-[#ea580c] transition-colors text-white px-3 py-1.5 text-xs rounded-lg font-bold flex items-center gap-1.5 flex-shrink-0"
              >
                <IoArrowRedoSharp /> Visitar
              </Link>
            </div>
          </Card>

    
          <Card className="p-4 bg-white border border-slate-200 rounded-xl">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
              Mais deste vendedor
            </h3>
            <ul className="flex flex-col gap-3">
              {PRODUCTS.filter(
                (prd) =>
                  prd.sellerID === product.sellerID && prd.id !== product.id,
              )
                .slice(0, 3)
                .map((prd) => (
                  <li
                    key={`seller-product-${prd.id}`}
                    className="border-b border-slate-100 last:border-0 pb-2 last:pb-0"
                  >
                    <Link
                      href={`${CATEGORIES.find((cat) => cat.id === prd.categoryID)?.path}/${prd.id}`}
                      className="flex flex-row items-center gap-3 group"
                    >
                      <div className="relative h-11 w-11 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {prd.photo ? (
                          <Image
                            alt={prd.name}
                            src={prd.photo}
                            fill
                            className="object-contain p-0.5"
                          />
                        ) : (
                          <MdHideImage size={20} className="text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-slate-800 group-hover:text-[#ea580c] transition-colors truncate">
                          {prd.name}
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-0.5">
                          {prd.price.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
