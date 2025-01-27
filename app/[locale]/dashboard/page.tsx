import { auth } from "@/auth";
import UserProfileCard from "./components/UserProfile";
import { User } from "@/lib/types/user";


export default async function Home() {
	const session = await auth()
	return (
		<div className="p-4">
      <UserProfileCard user={session?.user as User} />
    </div>
	);
}
