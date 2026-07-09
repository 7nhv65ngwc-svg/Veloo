"use client";

import { Button } from "@/app/components/button";
import { useCart } from "@/app/contexts/cart.context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FinishStep() {
  const { clearCart } = useCart();
  const router = useRouter();

  
  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, []);

  return (
    <div className="p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
      
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold animate-bounce">
        ✓
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-800">
          Pedido Realizado!
        </h2>
        <p className="text-slate-500 mt-1 max-w-xs mx-auto">
          Obrigado pela compra. O lojista parceiro já foi notificado e você
          receberá as atualizações por e-mail.
        </p>
      </div>

      
      <div className="w-full max-w-sm bg-slate-50 border border-slate-100 rounded-xl p-4 text-left text-sm flex flex-col gap-2 my-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Código do Pedido:</span>
          <span className="font-mono font-bold text-slate-700">
            #VL-{Math.floor(100000 + Math.random() * 900000)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Status do pagamento:</span>
          <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-xs">
            Aprovado
          </span>
        </div>
      </div>

      
      <div className="w-full max-w-sm mt-2">
        <Button
          onClick={() => router.push("/")}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-all"
        >
          Voltar para a Home
        </Button>
      </div>
    </div>
  );
}
