import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const secret = process.env.AUTH_SECRET;

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // this can be removed if you have root page on /
    //in my project for example root page is /dasboard so all (/ /en /ro) will map to /en/dasboard


    // const redirectMap: { [key: string]: string } = {
    //     "/": "/",
    //     "/en": "/",
    //     "/ro": "/",
    // };

    // if (redirectMap[pathname]) {
    //     return NextResponse.redirect(new URL(redirectMap[pathname], request.url));
    // }


    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        "/",

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        "/(en|ro)/:path*",

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        "/((?!_next|_vercel|api|.*\\..*).*)",

        // Protect the dashboard route
        "/dashboard/:path*",
    ],
};
