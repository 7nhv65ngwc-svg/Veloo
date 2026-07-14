"use client";

import { Button } from "@/app/components/button";
import { useCheckout } from "@/app/contexts/checkout.context";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);
  const { setAddress } = useCheckout();

  const fetchAddress = async (cleanCep: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado!");
        setRua("");
        bairro && setBairro("");
        setCidade("");
        setEstado("");
        return;
      }

      setRua(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
      toast.success("Endereço localizado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar o CEP.");
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let maskedValue = rawValue;

    if (rawValue.length > 5) {
      maskedValue = `${rawValue.slice(0, 5)}-${rawValue.slice(5, 8)}`;
    }

    setCep(maskedValue);

    if (rawValue.length === 8) {
      fetchAddress(rawValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setAddress({
      city: cidade,
      complement: complemento,
      neighborhood: bairro,
      number: numero,
      publicPlace: rua,
      state: estado,
      zipcode: cep,
    });
    setStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-4 max-w-md mx-auto text-slate-800"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Endereço de Entrega
        </h2>
      </div>

      {/* CEP */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600">
          CEP{" "}
          {loading && (
            <span className="text-orange-500 animate-pulse">(Buscando...)</span>
          )}
        </label>
        <input
          type="text"
          placeholder="00000-000"
          maxLength={9}
          value={cep}
          onChange={handleCepChange}
          disabled={loading}
          className="border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400 disabled:opacity-70"
          required
        />
      </div>

      {/* RUA / NÚMERO */}
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

      {/* BAIRRO / COMPLEMENTO */}
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

      {/* CIDADE / UF */}
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

      <div className="flex flex-row gap-3 mt-4 w-full">
        <Button
          type="button"
          onClick={goBack}
          className="flex-1"
          disabled={loading}
        >
          Voltar
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? "Buscando..." : "Avançar"}
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
