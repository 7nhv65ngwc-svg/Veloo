"use server";

import { cookies } from "next/headers";
import { LoginSchema } from "../schemas/login.schema";
import { z } from "zod";

export type LoginError = {
  email?: string[];
  password?: string[];
};

export async function login(
  prev: FormState<LoginError>,
  formData: FormData,
): Promise<FormState<LoginError,{id:string}>> {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    const { properties } = z.treeifyError(validatedFields.error);
    return {
      success: false,
      errors: {
        email: properties?.email?.errors,
        password: properties?.password?.errors,
      },
      message: "verifique os campos informados!",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response: Array<{
      id: string;
      email: string;
      password: string;
    }> = await fetch(`http://localhost:3001/users?email=${email}`).then(
      (data) => data.json(),
    );

    if (response.length === 0 || response[0].password !== password)
      throw new Error("Usuário ou Senha inválidos!");

    const user = {
      id: response[0].id,
      email: response[0].email,
    };

    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(user));

    return {
      success: true,
      message: "Login realizado com sucesso!",
      data: user,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: err?.message || "Erro Interno do Servidor",
    };
  }
}
