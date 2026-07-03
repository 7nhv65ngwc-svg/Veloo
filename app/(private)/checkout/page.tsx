"use client"

import { QuantitySelector } from "@/app/(public)/components/quantity-selector";
import { Card } from "@/app/components/card";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaCreditCard, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import AddressStep, { CartStep } from "./Address-step";
import PayamentStep from "./payament-step";
import OverviewStep from "./overview-step";
import FinishStep from "./Finish-step";



enum EStep {
    CART,
    ADDRESS,
    PAYAMENT,
    OVERVIEW,
    STATUS,
    REVIEW,
    FINISH
}

interface IStep {
    icon: IconType,
    label: string,
    value: EStep
}

const STEPS: Array<IStep> = [
    { icon: IoCart, label: "Carrinho", value: EStep.CART },
    { icon: FaMapMarkerAlt, label: "Endereço", value: EStep.ADDRESS },
    { icon: FaCreditCard, label: "Pagamento", value: EStep.PAYAMENT },
    { icon: FaEye, label: "Revisão", value: EStep.OVERVIEW },
    { icon: FaCircleCheck, label: "Concluir", value: EStep.STATUS }
]

function Step({ data, step }: { data: IStep, step: EStep }) {
    const Icon = data.icon;

    return (
        <div className={`flex flex-row gap-1.5 items-center ${data.value === step ? "text-[#00BC99]" : "text-slate-400"} select-none`}>
            <Icon size={20} />
            <span>{data.label}</span>
        </div>
    )
}

export default function Page() {
    const [step, setStep] = useState<EStep>(EStep.CART)
    const { cart } = useCart()
    return (
        <main className="p-2">
            <Card className="flex flex-row items-center gap-6 justify-center">
                {
                    STEPS.map((st, i) => (
                        <>
                            <Step key={`step-${i}`} data={st} step={step} />
                            {i < (STEPS.length - 1) && <div className="w-4 h-1 bg-gray-300" />}
                        </>
                    ))
                }
            </Card>
            {step === EStep.CART && <CartStep setStep={() => setStep(EStep.ADDRESS)}/>}
            {step === EStep.ADDRESS && <AddressStep setStep={() => setStep(EStep.PAYAMENT)} />}
            {step === EStep.PAYAMENT && <PayamentStep setStep={() => setStep(EStep.OVERVIEW)}/>}
            {step === EStep.OVERVIEW && <OverviewStep setStep={() => setStep(EStep.FINISH)}/>}
            {step === EStep.STATUS && <FinishStep />}
        </main>
    );
}