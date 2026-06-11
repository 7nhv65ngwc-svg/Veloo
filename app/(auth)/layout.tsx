import { ReactNode } from "react";
import { Card } from "../components/card";

interface IProps {
    children: ReactNode
}

export default function Layout({ children }: Readonly<IProps>) {
    return (
        <>
            <header className="h-12 bg-[#ea580c] w-full flex items-center px-175">
                <h1 className="text-xl text-black font-bold">Veloo</h1>
            </header>
            <main className="flex items-center justify-center flex-2">
                <Card>
                    {children}
                </Card>
            </main>

        </>
    )
}