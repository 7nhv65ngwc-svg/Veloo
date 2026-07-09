"use client";

import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { Input } from "@/app/components/input";
import { Select } from "@/app/components/select";
import { useCart } from "@/app/contexts/cart.context";

interface PaymentStepProps {
  setStep: () => void;
  goBack: () => void;
}

export function Payment({ setStep, goBack }: PaymentStepProps) {
  const { payment, cart } = useCart();

  return (
    <div className="flex flex-col gap-2 items-center">
      <Card className="w-xl flex flex-col gap-2">
        <Input
          minLength={16}
          maxLength={19}
          onChange={(e) =>
            payment.setCardNumber(
              e.currentTarget.value
                .replace(/\D/g, "")
                .replace(/(\d{4})(?=\d)/g, "$1 "),
            )
          }
          value={payment.cardNumber}
          label="Número do Cartão"
          placeholder="0000 0000 0000 0000"
        />

        <Input
          minLength={3}
          onChange={(e) =>
            payment.setCardholder(
              e.currentTarget.value.replace(/[^a-zA-ZÀ-ÿ\s.]/g, ""),
            )
          }
          value={payment.cardholder}
          label="Nome do Titular"
          placeholder="Ex: Maria Lopes"
        />

        <div className="flex flex-row items-center gap-2">
          <div className="flex-1">
            <Input
              minLength={5}
              maxLength={5}
              onChange={(e) => {
                let value = e.currentTarget.value.replace(/\D/g, "");
                value = value.substring(0, 4);

                if (value.length > 2) {
                  payment.setExpirationDate(
                    value.replace(/^(\d{2})(\d)/, "$1/$2"),
                  );
                } else {
                  payment.setExpirationDate(value);
                }
              }}
              value={payment.expirationDate}
              label="Vencimento"
              placeholder="MM/AA"
            />
          </div>

          <div className="flex-1">
            <Input
              minLength={3}
              maxLength={3}
              onChange={(e) =>
                payment.setCvv(e.currentTarget.value.replace(/\D/g, ""))
              }
              value={payment.cvv}
              label="Código de Segurança"
              placeholder="000"
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div className="flex-1">
            <Input
              minLength={11}
              maxLength={14}
              onChange={(e) => {
                let value = e.currentTarget.value.replace(/\D/g, "");
                value = value.substring(0, 11);

                value = value.replace(/^(\d{3})(\d)/, "$1.$2");
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
                value = value.replace(
                  /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
                  "$1.$2.$3-$4",
                );
                payment.setDocument(value);
              }}
              value={payment.document}
              label="Documento do Titular"
              placeholder="000.000.000-00"
            />
          </div>
          <div className="flex-1">
            <Select
              label="Parcelas"
              value={payment.installment}
              onChange={(e) =>
                payment.setInstallment(Number(e.currentTarget.value))
              }
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={`installment-${i + 1}`} value={i + 1}>
                  {i + 1}x de{" "}
                  {((cart?.total || 0) / (i + 1)).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>
      <Card className="w-xl flex gap-2">
        <Button onClick={goBack}>Voltar</Button>
        <Button
          onClick={setStep}
          disabled={
            payment.cardNumber?.replace(/\D/g, "").length !== 16 ||
            !payment.cardholder ||
            payment.expirationDate?.length !== 5 ||
            payment.cvv?.replace(/\D/g, "").length !== 3 ||
            payment.document?.replace(/\D/g, "").length !== 11
          }
        >
          Avançar
        </Button>
      </Card>
    </div>
  );
}
