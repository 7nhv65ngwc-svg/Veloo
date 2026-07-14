"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "@/app/contexts/cart.context";
import { useCheckout } from "@/app/contexts/checkout.context";

interface FinishStepProps {
  resetCheckout: () => void;
}

export default function FinishStep({ resetCheckout }: FinishStepProps) {

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="p-4 flex flex-col gap-6 max-w-2xl mx-auto w-full text-slate-800 items-center text-center">
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
          ✓
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-2">
          Pedido Confirmado!
        </h2>
        <p className="text-sm text-slate-500 max-w-md">
          Obrigado por comprar conosco.
        </p>
      </div>

      <div className="w-full max-w-[260px] mt-2">
        <button
          type="button"
          onClick={handleGoHome}
          className="w-full bg-[#EA580C] hover:bg-black text-white py-3 rounded-lg text-sm font-bold transition-all cursor-pointer"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
}