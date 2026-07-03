"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props"
import ImageNext from "next/image"
import { useState } from "react"
import { MdHideImage } from "react-icons/md"

interface IProps {
    alt: string,
    src?: string | StaticImport,
    width: number,
    height: number,
    size: number
}

export function Image({ alt, src, width, height, size }: IProps) {
    const [error, setError] = useState<boolean>(false)
    return (
        <div className="mb-2 relative text-slate-200 rounded-lg overflow-hidden flex items-center justify-center"
            style={{
                height: height,
                width: width,
            }}>
            {
                src && !error ? <ImageNext
                    alt={alt}
                    src={src}
                    onError={() => setError(true)}
                    fill
                /> : <MdHideImage size={size} />
            }
        </div>
    )
}