import { z } from "zod"

export const registerClientSchema = z.object({
    name: z.string("Nome é obrigatorio"),
    email: z.email("E-mail inválido"),
    password: z.string("A senha é obrigatoria"),
    confPassword: z.string("Confirma Senha")
})