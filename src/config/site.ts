import { profileContent } from "@/config/profile";

export const siteMetadata = {
	origin: import.meta.env.VITE_SITE_URL,
	name: "Aadi Sanghvi",
	title: "Aadi Sanghvi",
	description: profileContent.headline.map((seg) => seg.text).join(""),
	twitterHandle: "@aadisanghvii",
	locale: "en_US",
	socialImage: {
		path: "/og-image.png",
		alt: "Portrait card for Aadi Sanghvi",
		width: 1200,
		height: 630,
		type: "image/png",
	},
	robots:
		"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
} as const;

export const formatTitle = (page?: string) =>
	page ? `${page} | ${siteMetadata.name}` : siteMetadata.name;
