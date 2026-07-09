"use client";

import { Button } from "@/app/components/button";
import { useState } from "react";

interface AddressStepProps {
  setStep: () => void;
  goBack: () => void;
}

export default function AddressStep({ setStep, goBack }: AddressStepProps) {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-4 max-w-md mx-auto"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Endereço de Entrega
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600">CEP</label>
        <input
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">
            Rua / Logradouro
          </label>
          <input
            type="text"
            placeholder="Av. Brasil"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">Número</label>
          <input
            type="text"
            placeholder="123"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">Bairro</label>
          <input
            type="text"
            placeholder="Centro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">
            Complemento
          </label>
          <input
            type="text"
            placeholder="Apto, bloco..."
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3 flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">Cidade</label>
          <input
            type="text"
            placeholder="São Paulo"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">UF</label>
          <input
            type="text"
            maxLength={2}
            placeholder="SP"
            value={estado}
            onChange={(e) => setEstado(e.target.value.toUpperCase())}
            className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 text-center focus:outline-none focus:border-slate-400"
            required
          />
        </div>
      </div>

      <div className="flex flex-row gap-3 mt-4">
        <div className="flex-1">
          <Button type="button" onClick={goBack}>
            Voltar para o Carrinho
          </Button>
        </div>
        <Button onClick={setStep} className="flex-1">
          Ir para o Pagamento
        </Button>
      </div>
    </form>
  );
}

interface CartStepProps {
  setStep: () => void;
}

export function CartStep({ setStep }: CartStepProps) {
  return null;
}
