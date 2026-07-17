import { createFileRoute } from "@tanstack/react-router";
import Experiences from "@/components/experiences";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Projects from "@/components/projects";
import Section from "@/components/section";
import { profileContent } from "@/config/profile";
import { siteMetadata } from "@/config/site";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: siteMetadata.title },
			{ name: "description", content: siteMetadata.description },
			{ property: "og:title", content: siteMetadata.title },
			{ property: "og:description", content: siteMetadata.description },
			{ property: "og:url", content: siteMetadata.origin },
			{
				property: "og:image",
				content: `${siteMetadata.origin}${siteMetadata.socialImage.path}`,
			},
			{
				property: "og:image:secure_url",
				content: `${siteMetadata.origin}${siteMetadata.socialImage.path}`,
			},
			{ property: "og:image:type", content: siteMetadata.socialImage.type },
			{ property: "og:image:alt", content: siteMetadata.socialImage.alt },
			{
				property: "og:image:width",
				content: String(siteMetadata.socialImage.width),
			},
			{
				property: "og:image:height",
				content: String(siteMetadata.socialImage.height),
			},
			{ property: "og:type", content: "profile" },
			{ name: "twitter:title", content: siteMetadata.title },
			{ name: "twitter:description", content: siteMetadata.description },
			{
				name: "twitter:image",
				content: `${siteMetadata.origin}${siteMetadata.socialImage.path}`,
			},
			{ name: "twitter:image:alt", content: siteMetadata.socialImage.alt },
		],
		links: [
			{ rel: "canonical", href: siteMetadata.origin },
			...profileContent.socialProfiles.map((socialProfile) => ({
				rel: "me" as const,
				href: socialProfile.url,
			})),
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@graph": [
						{
							"@type": "WebPage",
							"@id": `${siteMetadata.origin}#webpage`,
							url: siteMetadata.origin,
							name: siteMetadata.title,
							description: siteMetadata.description,
							isPartOf: {
								"@id": `${siteMetadata.origin}#website`,
							},
							about: {
								"@id": `${siteMetadata.origin}#person`,
							},
							primaryImageOfPage: {
								"@type": "ImageObject",
								url: `${siteMetadata.origin}${siteMetadata.socialImage.path}`,
								width: siteMetadata.socialImage.width,
								height: siteMetadata.socialImage.height,
							},
						},
						{
							"@type": "Person",
							"@id": `${siteMetadata.origin}#person`,
							name: profileContent.name,
							description: siteMetadata.description,
							url: siteMetadata.origin,
							email: `mailto:${profileContent.contactEmail}`,
							image: `${siteMetadata.origin}${siteMetadata.socialImage.path}`,
							knowsAbout: [
								"Product engineering",
								"Attendance systems",
								"Web development",
							],
							sameAs: profileContent.socialProfiles.map(
								(socialProfile) => socialProfile.url,
							),
							jobTitle: profileContent.workExperience[0]?.role,
							worksFor: profileContent.workExperience[0]
								? {
										"@type": "Organization",
										name: profileContent.workExperience[0].company,
									}
								: undefined,
						},
						{
							"@type": "WebSite",
							"@id": `${siteMetadata.origin}#website`,
							name: siteMetadata.name,
							url: siteMetadata.origin,
							description: siteMetadata.description,
							inLanguage: "en-US",
							publisher: {
								"@id": `${siteMetadata.origin}#person`,
							},
						},
					],
				}),
			},
		],
	}),
	component: HomePage,
});

function HomePage() {
	const profile = profileContent;

	return (
		<main
			id="main-content"
			className="max-w-2xl lg:max-w-3xl mx-auto px-6 min-h-dvh flex flex-col justify-center pt-12 pb-8 lg:py-8"
		>
			<Header displayName={profile.name} headline={profile.headline} />

			<Section label="work">
				<Experiences items={profile.workExperience} />
			</Section>

			<Section label="projects">
				<Projects items={profile.projects} />
			</Section>

			<Footer
				socialProfiles={profile.socialProfiles}
				contactEmail={profile.contactEmail}
			/>
		</main>
	);
}
