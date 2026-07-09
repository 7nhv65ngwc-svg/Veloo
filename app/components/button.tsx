import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {}

export function Button({ ...props }: IProps) {
  return (
    <button
      {...props}
      className={`w-full bg-[#EA580C] text-white py-2 px-4 rounded-md cursor-pointer `.concat(
        props?.className || "",
      )}
    />
  );
}
