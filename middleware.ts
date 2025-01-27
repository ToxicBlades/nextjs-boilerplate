import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const secret = process.env.AUTH_SECRET;

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const redirectMap: { [key: string]: string } = {
        "/": "/dashboard",
        "/en": "/dashboard",
        "/ru": "/dashboard",
        "/ro": "/dashboard",
    };

    if (redirectMap[pathname]) {
        return NextResponse.redirect(new URL(redirectMap[pathname], request.url));
    }

    if (pathname.includes("/dashboard")) {
        const token = await getToken({ req: request, secret });
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        "/",

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        "/(en|ru|ro)/:path*",

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        "/((?!_next|_vercel|api|.*\\..*).*)",

        // Protect the dashboard route
        "/dashboard/:path*",
    ],
};
