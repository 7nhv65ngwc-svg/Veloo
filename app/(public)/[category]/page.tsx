"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "@/app/mocks/categories";
import { useCart } from "@/app/contexts/cart.context";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { Suspense } from "react";

export const PRODUCTS: Array<any> = [
  {
    id: 1,
    photo:
      "https://http2.mlstatic.com/D_Q_NP_673000-MLA109740530955_032026-F.webp",
    categoryID: 1,
    name: "Pneu Aro 15 185/60R15 84H F-600 Firestone",
    price: 350.0,
  },
  {
    id: 2,
    categoryID: 2,
    photo:
      "https://http2.mlstatic.com/D_NQ_NP_2X_977639-MLB108811095592_032026-F.webp",
    name: "Kit Troca De Óleo 5w30 Acea C4 Nissan Frontier 2.3 2017a2021",
    price: 650.0,
  },
  {
    id: 3,
    photo:
      "https://http2.mlstatic.com/D_NQ_NP_2X_657043-MLB89102577641_082025-F-kit-capa-de-chuva-roupa-conjunto-para-motoqueiro-reforcada.webp",
    categoryID: 3,
    name: "Kit Capa De Chuva Roupa Conjunto Para Motoqueiro Reforçada",
    price: 135.52,
  },
  {
    id: 4,
    photo: "https://m.media-amazon.com/images/I/51aZWW6zjpL._AC_SX679_.jpg",
    categoryID: 4,
    name: "Capacete Masculino LS2 FF808 Preto Fechado Bicomposto Moto",
    price: 1110.55,
  },
  {
    id: 5,
    photo:
      "https://http2.mlstatic.com/D_NQ_NP_2X_971864-MLA91925160023_092025-F.webp",
    categoryID: 5,
    name: "Console Playstation 5 Slim Edição Digital 825 Gb",
    price: 3684,
  },
  {
    id: 6,
    photo:
      "https://http2.mlstatic.com/D_NQ_NP_2X_655403-MLA99494582030_112025-F.webp",
    categoryID: 6,
    name: "Drone DJI Mini 4k MT2SD Cor Cinza",
    price: 3561,
  },
  {
    id: 7,
    photo:
      "https://electrolux.vtexassets.com/arquivos/ids/288205-1000-1000?v=639045978439200000&width=1000&height=1000&aspect=true&format=auto",
    categoryID: 7,
    name: "Geladeira Electrolux Frost Free 432L Efficient AutoSense Duplex Branca (TF70)",
    price: 3258,
  },
  {
    id: 8,
    photo:
      "https://electrolux.vtexassets.com/arquivos/ids/266943-800-800?v=638729964542400000&width=800&height=800&aspect=true&format=auto",
    categoryID: 8,
    name: "Máquina de Lavar Electrolux 8,5kg Branca Turbo Economia com Jet&Clean e Filtro Fiapos (LAC09)",
    price: 1658,
  },
];

function CategoryContent() {
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const { add } = useCart();

  const currentCategorySlug = params?.category;
  const searchQuery = searchParams.get("search") || "";

  const matchedCategory = CATEGORIES.find((cat) => {
    const formattedPath = cat.path.replace("/", "");
    return formattedPath === currentCategorySlug;
  });

  const filteredProducts = PRODUCTS.filter((product) => {
    if (searchQuery) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return product.categoryID === matchedCategory?.id;
  });

  const handleAddProduct = (product: any) => {
    add({ ...product, amount: 1 });
    toast.success("Adicionado ao carrinho!");
  };

  // LOGICA CORRIGIDA: Agora salva o produto de verdade no localStorage
  const handleFavoriteProduct = (product: any) => {
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
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">
          {searchQuery
            ? `Resultados para: "${searchQuery}"`
            : matchedCategory
              ? `Categoria: ${matchedCategory.name}`
              : `Categoria: ${currentCategorySlug?.replace("-", " ")}`}
        </h1>
        <p className="text-xs text-slate-400">
          {filteredProducts.length} produto(s) encontrado(s).
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="w-full text-center py-12 bg-white rounded-lg border border-slate-200 text-slate-400 text-sm">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const productCategory = CATEGORIES.find(
              (cat) => cat.id === product.categoryID,
            );
            const categorySlug = productCategory
              ? productCategory.path.replace("/", "")
              : currentCategorySlug;

            return (
              <div
                key={product.id}
                className="border border-slate-200 bg-white rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-3 bg-white rounded-md">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h2 className="font-bold text-sm text-slate-800 mb-2 line-clamp-2 min-h-10">
                  {product.name}
                </h2>

                <span className="font-black text-lg text-slate-900 block mb-3">
                  {product.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddProduct(product)}
                    className="w-full bg-black hover:bg-green-600 text-white text-center text-xs font-semibold py-2.5 rounded-md flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FaCartPlus size={14} />
                    Adicionar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFavoriteProduct(product)}
                    className="w-full bg-black hover:bg-red-600 text-white text-center text-xs font-semibold py-2.5 rounded-md flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FaRegHeart size={14} />
                    Favorito
                  </button>

                  <Link
                    href={`/${categorySlug}/${product.id}`}
                    className="w-full bg-black hover:bg-blue-600 text-white text-center text-xs font-semibold py-2.5 rounded-md flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    Visitar Produto
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-sm text-slate-500">
          Carregando listagem...
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}
