"use client";

import { Card } from "@/app/components/card";
import { useCart } from "@/app/contexts/cart.context";
import { useState } from "react";
import { IconType } from "react-icons";

import {
  FaCreditCard,
  FaEye,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import CartStep from "./cart-step";
import AddressStep from "./address-step";
import { Payment } from "./payament-step";
import OverviewStep from "./overview-step";
import FinishStep from "./finish-step";
import Link from "next/link";

enum EStep {
  CART,
  ADDRESS,
  PAYMENT,
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
  { icon: FaCreditCard, label: "Pagamento", value: EStep.PAYMENT },
  { icon: FaEye, label: "Revisão", value: EStep.OVERVIEW },
  { icon: FaCircleCheck, label: "Concluir", value: EStep.STATUS },
];

interface StepProps {
  data: IStep;
  step: EStep;
  onClick: () => void;
}

function Step({ data, step, onClick }: StepProps) {
  const Icon = data.icon;
  const isActive = data.value === step || data.value < step;

  return (
    <div
      onClick={onClick}
      className={`flex flex-row gap-1.5 items-center ${
        isActive ? "text-[#EA580C]" : "text-slate-400"
      } select-none cursor-pointer hover:opacity-80 transition-all`}
    >
      <Icon size={20} />
      <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
        {data.label}
      </span>
    </div>
  );
}

export default function Page() {
  const [step, setStep] = useState<EStep>(EStep.CART);
  const { cart } = useCart();

  return (
    <main className="p-4 flex flex-col gap-4 max-w-2xl mx-auto">
      
      <Card className="flex flex-row items-center gap-4 justify-center py-4 px-2 overflow-x-auto">
        {STEPS.map((st, i) => (
          <div key={`step-container-${i}`} className="flex items-center gap-4">
            <Step data={st} step={step} onClick={() => setStep(st.value)} />
            {i < STEPS.length - 1 && (
              <div
                className={`w-6 h-0.5 transition-colors duration-300 ${
                  step > st.value ? "bg-[#EA580C]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </Card>

     
      <div className="flex justify-start px-1">
        <Link
          href="/"
          className="flex items-center gap-1 text-black  hover:text-black  px-1 rounded-md hover:bg-[#ea580c] cursor-pointer"
        >
          <FaArrowLeft size={10} />
          Continuar Comprando
        </Link>
      </div>

      
      <Card className="p-2">
        {step === EStep.CART && (
          <CartStep setStep={() => setStep(EStep.ADDRESS)} />
        )}

        {step === EStep.ADDRESS && (
          <AddressStep
            setStep={() => setStep(EStep.PAYMENT)}
            goBack={() => setStep(EStep.CART)}
          />
        )}

        {step === EStep.PAYMENT && (
          <Payment
            setStep={() => setStep(EStep.OVERVIEW)}
            goBack={() => setStep(EStep.ADDRESS)}
          />
        )}

        {step === EStep.OVERVIEW && (
          <OverviewStep
            setStep={() => setStep(EStep.STATUS)}
            goBack={() => setStep(EStep.PAYMENT)}
            goToAddressStep={() => setStep(EStep.ADDRESS)}
            goToPaymentStep={() => setStep(EStep.PAYMENT)}
          />
        )}

        {step === EStep.STATUS && <FinishStep />}
      </Card>
    </main>
  );
}
