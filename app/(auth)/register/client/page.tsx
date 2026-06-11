"use client"

import { registerClient } from "@/app/actions/register-client";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useActionState, useEffect } from "react"
import toast from "react-hot-toast";

export default function Page() {
    const [state, formAction, isPending] = useActionState(registerClient, { success: false })
    const router = useRouter()
    useEffect(() => {
        if (!state.success && state.errors) {
            const errors = Object.values(state.errors)
            const message = errors.flat()
            toast.error(message ? message[0] : state.message || "Ocorreu um erro desconhecido")

        } else if (state.success) {
            toast.success(state.message || "Cadastro realizado com sucesso!")
            setTimeout(() => router.push("/login"), 2000)
        }
    }, [state])

    return (
        <>
            <form action={formAction} className="flex flex-col gap-2">
                <Input id="name" name="name" label="Nome Completo" required placeholder="Ex João Nascimento da Silva" />
                <Input id="email" name="email" label="E-mail" required placeholder="João.nascimento@seudominio.com" />
                <Input id="password" name="password" type="password" label="Senha" required placeholder="Ex ••••••••" />
                <Input id="confPassword" name="confPassword" type="password" label="Confirmar Senha" required placeholder="Ex ••••••••" />

                <Button type="submit">Cadastra</Button>
            </form>
            <p className="mt-4 text-sm font-light">Já possui uma conta? <Link href={"/register"} className="text-[#1C4694] font-semibold"></Link>Entrar</p>
        </>
    )
}