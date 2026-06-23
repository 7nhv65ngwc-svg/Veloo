import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export function Card({ ...props }: IProps) {
    return (
        <div
            {...props}
            className={"bg-white border-2 rounded-md p-4 border-none ".concat(props?.className || "")} />
    )
}