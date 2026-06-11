import { ReactNode } from "react";

interface IProps {
    children?: ReactNode
}

export function Card({ children }: IProps){
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
            {children}
        </div>
    )
}