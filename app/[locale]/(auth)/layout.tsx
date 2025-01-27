import { auth } from "@/auth";
import { RouteConfig } from "@/lib/RoutesConfig";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

console.log(auth)
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('Auth.Layout');
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

// Layout for login
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (session?.user) {
        return redirect(RouteConfig.home);
    }
    return {children};
}
