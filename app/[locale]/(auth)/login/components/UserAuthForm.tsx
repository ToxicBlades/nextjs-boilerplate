import type * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons"
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form
				action={async () => {
					"use server";
					await signIn("google", { redirectTo: "/dashboard" });
				}}
			>
				<div className="grid gap-2">
					<Button variant="outline" type="submit">
						<Icons.google className="mr-2 h-4 w-4" />
						Google
					</Button>
				</div>
			</form>
		</div>
	);
}
