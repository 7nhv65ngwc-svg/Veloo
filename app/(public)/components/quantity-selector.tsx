import { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface IProps {
    amount: number,
    setAmount: Dispatch<SetStateAction<number>>,
    height?: number
}

export function QuantitySelector({ setAmount, amount, height = 6 }: IProps) {
    return (
        <div className="flex flex-row items-center">
            <button
                onClick={() => setAmount(amount - 1)}
                className="flex items-center justify-center rounded-l-md bg-[#ea580c] text-white cursor-pointer hover:bg-[black] hover:text-[#ea580c]"
                style={{
                    height: height * 3,
                    width: height * 3
                }}
            >
                <FaMinus size={height} />
            </button>
            <div className="border-y border-slate-500 text-slate-600 flex items-center justify-center"
                style={{
                    height: height * 3,
                    width: height * 3.5,
                    fontSize: height * 1.5
                }}
            >
                {amount}
            </div>
            <button
                onClick={() => setAmount(amount + 1)}
                className="flex items-center justify-center w-4 h-4 rounded-r-md bg-[#ea580c] text-white cursor-pointer hover:bg-[black] hover:text-[#ea580c]"
                style={{
                    height: height * 3,
                    width: height * 3
                }}
            >
                <FaPlus size={height} />
            </button>
        </div>
    )
}