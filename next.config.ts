import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig : NextConfig = {
	images: {
		domains: [
			"localhost",
			"res.cloudinary.com",
			"lh3.googleusercontent.com",
			"uploadthing.com",
			"utfs.io",
		],
	},
	swcMinify: true,
	output: "standalone",
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withNextIntl(nextConfig);
