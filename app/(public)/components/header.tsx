"use client";

import { Button } from "@/app/components/button";
import { useCart } from "@/app/contexts/cart.context";
import { CATEGORIES } from "@/app/mocks/categories";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  FaAngleRight,
  FaMinus,
  FaPlus,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoCart, IoClose, IoTrash } from "react-icons/io5";
import { MdFavorite, MdHideImage } from "react-icons/md";
import { SideCart } from "./side-cart";
import { useAuth } from "@/app/contexts/auth.context";
import { useRouter } from "next/navigation";

function HeaderButton({
  children,
  onClick,
  notification,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  notification?: number;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative h-6 w-6 bg-transparent hover:bg-[black] hover:text-[red] cursor-pointer rounded-md flex items-center justify-center"
    >
      {notification !== undefined && notification > 0 && (
        <div className="absolute h-3 w-3 flex items-center justify-center -top-px -right-px bg-[black] text-[6px] text-white rounded-full p-px">
          {notification}
        </div>
      )}
      {children}
    </button>
  );
}

function SidebarItem({ label }: { href: string; label: string }) {
  const slug = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <Link href={`/${slug}`}>
      <li className="flex flex-row items-center gap-2 justify-between hover:bg-gray-50 text-neutral-600 font-sans text-sm font-medium cursor-pointer px-2 py-2 border-b border-slate-100 transition-colors hover:text-black">
        {label}
        <FaAngleRight className="text-slate-400" size={14} />
      </li>
    </Link>
  );
}

function SidebarList({
  keyItem,
  label,
  data,
}: {
  keyItem: string;
  label: string;
  data: Array<{ id: number; label: string; href: string }>;
}) {
  return (
    <ul className="text-sm font-sans px-2 mt-3">
      <label className="font-bold text-xs text-black uppercase tracking-wider block mb-2 px-2">
        {label}
      </label>
      {data.map((vl) => (
        <SidebarItem
          key={`${keyItem}-${vl.id}`}
          href={vl.href}
          label={vl.label}
        />
      ))}
    </ul>
  );
}

interface IProductCart {
  id: number;
  name: string;
  categoryID: number;
  amount: number;
  price: number;
  photo?: string;
}

function CartItem({
  data,
  add,
  remove,
}: {
  data: IProductCart;
  remove: (product: IProductCart) => void;
  add: (product: IProductCart) => void;
}) {
  return (
    <div className="flex flex-row gap-1.5">
      <div className="text-slate-300 h-8 w-8 rounded-md overflow-hidden flex items-center justify-center">
        <MdHideImage size={25} />
      </div>
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
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center">
              <button
                onClick={() => remove({ ...data, amount: 1 })}
                className="flex items-center justify-center w-4 h-4 rounded-l-md bg-[black] text-white cursor-pointer hover:bg-[#EA580C] hover:text-[black]"
              >
                <FaMinus size={6} />
              </button>
              <div className="border-y border-slate-500 text-slate-600 w-6 h-4 flex items-center justify-center text-[8px]">
                {data.amount}
              </div>
              <button
                onClick={() => add({ ...data, amount: 1 })}
                className="flex items-center justify-center w-4 h-4 rounded-r-md bg-[black] text-white cursor-pointer hover:bg-[#EA580C] hover:text-[black]"
              >
                <FaPlus size={6} />
              </button>
            </div>
          </div>
          <div className="text-[12px] flex flex-row gap-px font-bold text-[black]">
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

export function Header() {
  const [show, setShow] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { cart, add, remove } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      {/* CABEÇALHO */}
      <header className="w-full">
        <div className="h-15 bg-gradient-to-r from-[#012E40] via-[#024959] to-[#EA580C] text-white flex flex-row items-center justify-between gap-4 px-3 shadow-md">
          <div className="flex flex-row items-center gap-2 min-w-[100px]">
            <HeaderButton onClick={() => setShow(true)}>
              <HiMenu />
            </HeaderButton>
            <Link
              href={"/"}
              className="hover:bg-black text-[20px] font-semibold rounded-lg px-2 py-1"
            >
              <h1>vello</h1>
            </Link>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md relative flex items-center"
          >
            <input
              type="text"
              placeholder="O que você está procurando hoje?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 bg-white text-slate-800 text-xs px-3 pr-9 rounded-md outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-slate-400 font-sans font-medium shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2.5 text-slate-400 hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              <FaSearch size={13} />
            </button>
          </form>

          <div className="flex flex-row items-center gap-2 min-w-[100px] justify-end">
            {/* FAVORITOS */}
            <HeaderButton onClick={() => router.push("/favoritos")}>
              <MdFavorite />
            </HeaderButton>
            {/* CARRINHO */}
            <HeaderButton
              className="hover:text-green-500"
              onClick={() => setShowCart(true)}
              notification={cart.products.reduce(
                (prev, curr) => prev + curr.amount,
                0,
              )}
            >
              <IoCart />
            </HeaderButton>

            {user ? (
              <div className="flex items-center gap-2">
                <HeaderButton>
                  <FaUserCircle />
                </HeaderButton>
                <button
                  onClick={logout}
                  className="bg-black text-white hover:text-[#ea580c] text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-black/20 hover:bg-[black] text-[10px] font-semibold rounded-lg px-4 py-1"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="bg-[black] text-white w-full">
          <ul className="flex flex-row justify-center flex-wrap items-center text-sm font-sans font-medium text-center">
            {CATEGORIES.filter((vl) => vl.highlights).map((vl) => {
              const itemSlug = vl.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-");

              return (
                <Link key={`category-${vl.id}`} href={`/${itemSlug}`}>
                  <li className="px-3.5 hover:bg-gradient-to-r hover:from-[#012E40] hover:via-[#024959] hover:to-[#EA580C] h-8 flex items-center justify-center transition-colors cursor-pointer">
                    {vl.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </header>

      <section
        className={`z-60 absolute h-svh bg-white shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${show ? "w-64" : "w-0"}`}
      >
        <div className="relative h-full">
          {show && (
            <button
              type="button"
              onClick={() => setShow(false)}
              className="absolute -right-3 top-2 bg-red-600 flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[BLACK] shadow-lg"
            >
              <IoClose />
            </button>
          )}

          <div className="bg-[black] overflow-hidden h-15 w-full text-white">
            <div className="h-full p-2 flex flex-row gap-2 items-center">
              <div className="h-8 w-8 flex items-center justify-center">
                <FaUserCircle size={26} />
              </div>

              <div className="h-8 flex-1">
                {user ? (
                  <div className="flex flex-col">
                    <span className="text-[10px]">
                      Olá, {user.name || "Usuário"}
                    </span>
                    <button
                      onClick={logout}
                      className="text-left text-xs font-bold text-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Sair da conta
                    </button>
                  </div>
                ) : (
                  <Link
                    href={"/login"}
                    className="flex flex-col hover:text-[#ea580c]"
                  >
                    <span className="text-[10px]">Olá</span>
                    <span className="text-xs font-bold">
                      Entre com sua conta
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="h-[calc(100%-60px)] w-full overflow-y-scroll flex flex-col gap-2">
            <SidebarList
              keyItem="seller-lat"
              label="Top 5 Lojistas"
              data={CATEGORIES.slice(0, 5)

                .map((vl) => ({
                  id: vl.id,
                  label: vl.name,
                  href: vl.path,
                }))}
            />
            <SidebarList
              keyItem="category-lat"
              label="Categorias"
              data={CATEGORIES.map((vl) => ({
                id: vl.id,
                label: vl.name,
                href: vl.path,
              }))}
            />
          </div>
        </div>
      </section>

      <SideCart show={showCart} setShow={setShowCart} />
    </>
  );
}
