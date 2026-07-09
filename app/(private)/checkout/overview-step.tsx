"use client";

import { Button } from "@/app/components/button";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";

interface OverviewStepProps {
  setStep: () => void;
  goBack: () => void;
  goToAddressStep: () => void;
  goToPaymentStep: () => void;
}

export default function OverviewStep({
  setStep,
  goBack,
  goToAddressStep,
  goToPaymentStep,
}: OverviewStepProps) {
  const { cart, payment } = useCart();

  const deliveryAddress = {
    street: "Av. Paulista",
    number: "1000",
    complement: "Apto 42",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    cep: "01310-100",
  };

  const paymentMethod = {
    type: "Cartão de Crédito",
    details: payment?.cardNumber
      ? `Finalizado em ${payment.cardNumber.slice(-4)}`
      : "Finalizado em 5455",
    installments: payment?.installment
      ? `${payment.installment}x de ${((cart?.total || 0) / payment.installment).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`
      : "1x de R$ 0,00",
  };

  const totalCartPrice =
    cart?.products?.reduce((acc, prd) => acc + prd.price * prd.amount, 0) || 0;

  const smallButtonClass =
    "!w-fit !py-1 !px-3 text-xs !border-none outline-none focus:outline-none ring-0";

  return (
    <div className="p-4 flex flex-col gap-4 max-w-4xl mx-auto w-full text-slate-800">
      {/* RETORNO / VOLTAR */}
      <div className="border-b border-slate-200 pb-3 w-full flex flex-col gap-2 items-start">
        <Button type="button" onClick={goBack} className={smallButtonClass}>
          ← Voltar
        </Button>
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Revise a sua compra
          </h2>
          <p className="text-sm text-slate-500">
            Verifique as informações antes de confirmar.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm flex flex-row justify-between items-center w-full gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-sm text-slate-800 mb-1">
            Endereço de entrega
          </h3>
          <p className="text-sm text-slate-600">
            {deliveryAddress.street}, {deliveryAddress.number}{" "}
            {deliveryAddress.complement && `- ${deliveryAddress.complement}`}
          </p>
          <p className="text-xs text-slate-500">
            {deliveryAddress.neighborhood} - {deliveryAddress.city}/
            {deliveryAddress.state}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            CEP: {deliveryAddress.cep}
          </p>
        </div>
        <div className="flex justify-end items-center">
          <Button
            type="button"
            onClick={goToAddressStep}
            className={smallButtonClass}
          >
            Alterar Endereço
          </Button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm flex flex-row justify-between items-center w-full gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-sm text-slate-800 mb-1">
            Forma de pagamento
          </h3>
          <p className="text-sm text-slate-600 font-medium">
            {paymentMethod.type}
          </p>
          <p className="text-xs text-slate-500">{paymentMethod.details}</p>
          {paymentMethod.installments && (
            <p className="text-xs text-slate-500 mt-1">
              {paymentMethod.installments}
            </p>
          )}
        </div>
        <div className="flex justify-end items-center">
          <Button
            type="button"
            onClick={goToPaymentStep}
            className={smallButtonClass}
          >
            Alterar Pagamento
          </Button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm w-full">
        <div className="mb-4">
          <h3 className="font-bold text-sm text-slate-800">Produtos</h3>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {cart?.products && cart.products.length > 0 ? (
            cart.products.map((prd) => (
              <li
                key={prd.id}
                className="flex flex-col justify-between border border-slate-100 rounded-lg p-3 bg-slate-50/50 hover:shadow-sm transition-shadow h-full"
              >
                <div className="w-full h-32 flex items-center justify-center bg-white rounded-md overflow-hidden mb-3 p-2 border border-slate-100">
                  <Image
                    alt={prd.name}
                    src={prd.photo}
                    height={112}
                    width={112}
                    size={112}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800 text-xs line-clamp-2 min-h-[32px] leading-tight">
                      {prd.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Qtd:{" "}
                      <span className="font-semibold text-slate-700">
                        {prd.amount}
                      </span>
                    </p>
                  </div>

                  <span className="font-bold text-slate-800 text-sm mt-1 pt-1 border-t border-slate-100 block text-right">
                    {(prd.price * prd.amount).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="flex flex-col justify-between border border-slate-100 rounded-lg p-3 bg-slate-50/50 h-full col-span-full max-w-xs w-full">
              <div className="w-full h-32 flex items-center justify-center bg-slate-100 rounded-md mb-3">
                <span className="text-xs text-slate-400">Sem Imagem</span>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div>
                  <p className="font-medium text-slate-800 text-xs">
                    Exemplo de Produto Excluido/Vazio
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Qtd: 1</p>
                </div>
                <span className="font-bold text-slate-800 text-sm mt-1 pt-1 border-t border-slate-100 block text-right">
                  R$ 315,00
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-2 bg-slate-50 rounded-lg p-4 border border-slate-200 w-full flex flex-col items-center">
        <div className="flex justify-between items-center mb-4 w-full max-w-md">
          <span className="block font-bold text-slate-800 text-base">
            Total a pagar:
          </span>
          <span className="text-2xl font-black text-slate-800">
            {totalCartPrice > 0
              ? totalCartPrice.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              : "R$ 315,00"}
          </span>
        </div>

        <div className="w-full flex justify-center">
          <Button type="button" onClick={setStep} className={smallButtonClass}>
            Confirmar e pagar
          </Button>
        </div>
      </div>
    </div>
  );
}
