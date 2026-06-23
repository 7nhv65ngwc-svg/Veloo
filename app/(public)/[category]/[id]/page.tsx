"use client"

import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { CATEGORIES } from "@/app/mocks/categories";
import { PRODUCTS } from "@/app/mocks/products";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { MdHideImage } from "react-icons/md";
import { QuantitySelector } from "../../components/quantity-selector";
import { useState } from "react";
import { useCart } from "@/app/contexts/cart.context";
import { IoArrowRedoSharp } from "react-icons/io5";

export default function Page() {
    const { id } = useParams<{ id: string }>()
    const [amount, setAmount] = useState<number>(1)
    const { add } = useCart()

    if (isNaN(Number(id))) {
        toast.error("ID inválido!")
        return
    }

    const product = PRODUCTS.find(prd => prd.id === Number(id))

    if (!product) {
        toast.error("Produto não encontrado!")
        return
    }

    const category = CATEGORIES.find(cat => cat.id === product.categoryID)

    const handleAdd = () => {
        add({ ...product, amount })
        toast.success("Adicionado com sucesso!")
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            {/* INFO PRODUTO */}
            <div className="flex flex-row flex-wrap gap-2">
                {/* INFO GERAL */}
                <Card className="flex-3 flex flex-row gap-2 flex-wrap">
                    {/* IMAGEM */}
                    <div className="overflow-hidden h-100 w-100 rounded-lg relative flex items-center justify-center text-slate-200">
                        {
                            product.photo ? <Image
                                alt={product.name}
                                src={product.photo}
                                height={400}
                                width={400}
                            /> : <MdHideImage size={160} />
                        }
                    </div>
                    {/* INFOS */}
                    <div className="flex-1">
                        <Link href={category?.path || "#"} className="text-slate-400 text-[10px]">{category?.name || "Não identificado"}</Link>
                        <h1 className="font-bold text-lg">{product.name}</h1>
                        <div className="flex flex-row items-center gap-2">
                            <div className="text-[10px] text-[#ea580c]">{product.rating}</div>
                            <ul className="text-slate-200 flex flex-row items-center gap-px">{
                                Array.from({ length: 5 })
                                    .map((_, i) => (
                                        <li key={`rating-${i}`}>
                                            <FaStar size={10} style={{
                                                color: i + 1 <= product.rating ? "#ea580c" : undefined
                                            }} />
                                        </li>
                                    ))
                            }</ul>
                        </div>
                        <div className="font-bold text-2xl text-[#ea580c]">{product.price.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL"
                        })}</div>
                        <p className="text-slate-400 text-sm text-justify max-w-100">{product.description}</p>
                    </div>
                </Card>
                {/* ADICIONAIS */}
                <div className="flex-1.5 flex flex-col gap-2">
                    {/* CARRINHO */}
                    <Card className="flex flex-row items-center gap-2 flex-wrap">
                        <QuantitySelector height={9} amount={amount} setAmount={setAmount} />
                        <Button onClick={handleAdd} className="flex-1 flex flex-row items-center justify-center gap-2"><FaCartPlus /> Adicionar</Button>
                    </Card>
                    {/* VENDEDOR */}
                    <Card className="flex flex-row gap-2 items-center">
                        <div className="relative text-slate-200 h-10 w-10 rounded-md overflow-hidden p-2">
                            {
                                product.photo ? <Image
                                    alt={product.name}
                                    src={product.photo}
                                    fill
                                /> : <MdHideImage size={30} />
                            }
                        </div>
                        <div className="h-full flex-1 flex flex-row items-center gap-2">
                            <div className="h-full flex-1 p-2">
                                <div className="font-bold text-md">Nome do Vendedor</div>
                                <div className="text-slate-400 text-[12px] flex flex-row items-center gap-2">
                                    <div className="flex items-center gap-1.5"><span className="font-bold">5</span> <FaStar /></div>
                                    <div><span className="font-bold">5</span> Produtos</div>
                                </div>
                            </div>
                            <Link
                                href={`/seller/${product.sellerID}`}
                                className="bg-[black] hover:bg-[#ea580c] transition-all duration-300 text-white px-2 py-1.5 text-xs rounded-lg font-bold flex
                 items-center gap-1.5"><IoArrowRedoSharp /> Visitar</Link>
                        </div>
                    </Card>
                    {/* MAIS PRODUTOS DO VENDEDOR */}
                    <Card>
                        <ul>
                            {
                                PRODUCTS
                                    .filter(prd => prd.sellerID === product.sellerID && prd.id !== product.id)
                                    .slice(0, 3)
                                    .map(prd => (
                                        <li key={`seller-product-${prd.id}`} >
                                            <Link
                                                href={`${CATEGORIES.find(cat => cat.id === prd.categoryID)?.path}/${prd.id}`}
                                                className="flex flex-row items-center gap-2">
                                                <div className="relative text-slate-200 h-10 w-10 rounded-md overflow-hidden p-2">
                                                    {
                                                        prd.photo ? <Image
                                                            alt={prd.name}
                                                            src={prd.photo}
                                                            fill
                                                        /> : <MdHideImage size={30} />
                                                    }
                                                </div>
                                                <div className="h-full flex-1 p-2">
                                                    <div className="font-bold text-xs">{prd.name}</div>
                                                    <div className="text-[10px]">
                                                        {
                                                            prd.price.toLocaleString("pt-br", {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                            }
                        </ul>
                    </Card>
                </div>
            </div>

        </div>
    );
}