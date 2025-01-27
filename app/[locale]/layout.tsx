import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeProvider } from "../providers/ThemeProvider";
import { ToastProvider } from "../providers/ToastProvider";

export default async function RootLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
		notFound();
	}


		//Here is used suppressHydrationWarning for removing error which is cause by theme provider
		//This is because it currently doesnt work normaly with react 19 + shadcn + nextjs 15
		//Remove it when its fixed
    return (
		<html lang={locale} suppressHydrationWarning>
			<body>
				<ToastProvider />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
						{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
