import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UserAuthForm } from "./components/UserAuthForm";
import { RouteConfig } from "@/lib/RoutesConfig";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('Auth.Login');
	return {
			title: t('metaTitle'),
			description: t('metaDescription'),
	};
}

export default async function AuthenticationPage() {
	const t = await getTranslations('Auth.Login');

	return (
		<>
			<div className="md:hidden">
			</div>
			<div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="absolute top-4 right-4 md:top-8 md:right-8">
					<ThemeSwitcher />
				</div>

				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<div className="absolute inset-0 bg-custom_blue dark:bg-white" />
					<div className="relative z-20 flex items-center font-medium text-lg dark:text-black">
						<img className="mr-2 h-8 w-auto" src="/logo.png" alt="Logo" />
						Welcome
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="font-semibold text-2xl tracking-tight">
								{t('header.title')}
							</h1>
							<p className="text-muted-foreground text-sm">
								{t('header.subtitle')}
							</p>
						</div>
						<UserAuthForm />
						<p className="px-8 text-center text-muted-foreground text-sm">
							{t('termsAndPrivacy.agreement')}{" "}
							<Link
								href={RouteConfig.terms}
								className="underline underline-offset-4 hover:text-primary"
							>
								{t('termsAndPrivacy.terms')}
							</Link>{" "}
							{t('termsAndPrivacy.and')}{" "}
							<Link
								href={RouteConfig.policy}
								className="underline underline-offset-4 hover:text-primary"
							>
								{t('termsAndPrivacy.policy')}
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
