import NextAuth from "next-auth";
import type { Account, Profile, User } from "next-auth";
import Google from "next-auth/providers/google";
import userService from "./lib/services/user.service";
type SignInParams = {
	user: User;
	account: Account | null;
	profile?: Profile;
};

async function signInUser({ user, account }: SignInParams): Promise<boolean> {
	if (!account) {
		return false;
	}

	try {

    //In login auth we use api token from env(read about it in /docs/auth.md)
    //this one will return always true with fake data so comment or change function to test auth
		const searchRes = await userService.find(
			{
				filters: {
					email: {
						$eq: user.email,
					},
				},
			},
			process.env.STRAPI_API_TOKEN as string,
		);

		if (searchRes.data && searchRes.data.length > 0) {
			return true;
		}

		const userData = {
			email: user.email,
			name: user.name,
			username: user.email?.split("@")[0],
			password: "Password for your database if you have rbac with tokens and login",
			image: user.image,
		};
    // Here you can or use basic .create() or make your own functions register if you have some additional thing to do after creation of user for example assign roles and create for him login token
    // userService.register(userData);

		return true;
	} catch (error) {
		console.error("Error during sign-in process:", error);
		return false;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID || '',
			clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
		}),
	],
	callbacks: {
		signIn: signInUser,
		jwt: async ({ token }) => {
			const searchRes = await userService.find(
				{
					filters: { email: token.email },
				},
				process.env.STRAPI_API_TOKEN as string,
			);

			if (
				searchRes.data &&
				searchRes.data.length > 0
			) {
				try {
          //Here you can add any additional data to the token from backend if needed
          token.role = 'admin'
				} catch (error) {
					console.error("Error during JWT callback:", error);
				}
			}
			return token;
		},
		session({ session, token }) {
      //to add this data from token to session you need to extend session types in next-auth.d.ts
			session.user.role = token.role as string || "";
			return session;
		},
	},

	pages: {
		error: "/unauthorized",
	},
});
