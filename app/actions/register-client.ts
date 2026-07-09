"use server";

import { LoginSchema } from "../schemas/login.schema";
import { z } from "zod";
import { registerClientSchema } from "../schemas/register-client.schema";

export type RegisterClientError = {
  name?: string[];
  email?: string[];
  password?: string[];
  confPassword?: string[];
};

export async function registerClient(
  prev: FormState<RegisterClientError>,
  formData: FormData,
): Promise<FormState<RegisterClientError>> {
  const validatedFields = registerClientSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    const { properties } = z.treeifyError(validatedFields.error);
    return {
      success: false,
      errors: {
        name: properties?.name?.errors,
        email: properties?.email?.errors,
        password: properties?.password?.errors,
        confPassword: properties?.confPassword?.errors,
      },
      message: "verifique os campos informados!",
    };
  }

  try {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    return { success: true, message: "Cadastro realizado com sucesso" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erro Interno do Servidro" };
  }
}
