import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";

export default function Page() {
    return (
        <>
            <form className="flex flex-col gap-2">
                <Input label="Nome" />
                <Input label="E-mail" />
                <Input label="Telefone" />
                <div>
                    <div className="flex flex-red gap-1">
                        <Input label="Endereço" />
                        <Input label="Cidade" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <select className="flex-1">
                            <option>Sc - Floripa</option>
                        </select>
                        <Input label="Cep" />
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <Input label="Senha" />
                    <Input label="Confirmar Senha" />
                </div>
                <Button type="submit">Cadastrar</Button>
            </form>
        </>
    )
}