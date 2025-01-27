import { Session } from "next-auth";
import type { AvailableGroups } from "./user";

declare module "next-auth" {
	/**
	 * Adding custom properties to the NextAuth Session type
	 */

	//TODO: remove any from here( if removing any it says then that all fields could be undefined cause Session can be null and then all be undefined, to avoid errors atm we keeping it any because it wont cause ts cry about it)
	interface Session {
		user: {
			name: string;
			email: string;
			image: string;
			role: string;
		};
	}
}
