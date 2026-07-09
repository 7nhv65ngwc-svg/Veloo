"use client";

import { Card } from "@/app/components/card";
import { useCart } from "@/app/contexts/cart.context";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaCreditCard, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import CartStep from "./cart-step";
import AddressStep from "./address-step";
import { Payment } from "./payament-step";
import OverviewStep from "./overview-step";
import FinishStep from "./finish-step";

enum EStep {
  CART,
  ADDRESS,
  PAYAMENT,
  OVERVIEW,
  STATUS,
}

interface IStep {
  icon: IconType;
  label: string;
  value: EStep;
}

const STEPS: Array<IStep> = [
  { icon: IoCart, label: "Carrinho", value: EStep.CART },
  { icon: FaMapMarkerAlt, label: "Endereço", value: EStep.ADDRESS },
  { icon: FaCreditCard, label: "Pagamento", value: EStep.PAYAMENT },
  { icon: FaEye, label: "Revisão", value: EStep.OVERVIEW },
  { icon: FaCircleCheck, label: "Concluir", value: EStep.STATUS },
];

function Step({ data, step }: { data: IStep; step: EStep }) {
  const Icon = data.icon;
  const isActive = data.value === step || data.value < step;

  return (
    <div
      className={`flex flex-row gap-1.5 items-center ${isActive ? "text-[#00BC99]" : "text-slate-400"} select-none`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{data.label}</span>
    </div>
  );
}

export default function Page() {
  const [step, setStep] = useState<EStep>(EStep.CART);
  const { cart } = useCart();

  return (
    <main className="p-4 flex flex-col gap-6 max-w-2xl mx-auto">
      <Card className="flex flex-row items-center gap-4 justify-center py-4 px-2 overflow-x-auto">
        {STEPS.map((st, i) => (
          <div key={`step-container-${i}`} className="flex items-center gap-4">
            <Step data={st} step={step} />
            {i < STEPS.length - 1 && (
              <div
                className={`w-6 h-0.5 ${step > st.value ? "bg-[#00BC99]" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </Card>

      <Card className="p-2">
        {step === EStep.CART && (
          <CartStep setStep={() => setStep(EStep.ADDRESS)} />
        )}

        {step === EStep.ADDRESS && (
          <AddressStep
            setStep={() => setStep(EStep.PAYAMENT)}
            goBack={() => setStep(EStep.CART)}
          />
        )}

      
        {step === EStep.PAYAMENT && (
          <Payment
            setStep={() => setStep(EStep.OVERVIEW)}
            goBack={() => setStep(EStep.ADDRESS)}
          />
        )}

        {step === EStep.OVERVIEW && (
          <OverviewStep
            setStep={() => setStep(EStep.STATUS)}
            goBack={() => setStep(EStep.PAYAMENT)}
            goToAddressStep={() => setStep(EStep.ADDRESS)}
            goToPaymentStep={() => setStep(EStep.PAYAMENT)}
          />
        )}

        {step === EStep.STATUS && <FinishStep />}
      </Card>
    </main>
  );
}
