import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const user = req.cookies.get("user")
    if (!user) {
        const currentPath = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)
        return NextResponse.redirect(new URL(`/login?redirect=${currentPath}`, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/checkout'
}