import { auth } from "@/auth";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default async function Home() {
	const session = await auth()
	return (
		<>
			<div>hello {session?.user.name}</div>
			<ThemeSwitcher />
		</>
	);
}
