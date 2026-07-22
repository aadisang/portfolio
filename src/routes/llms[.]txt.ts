import { createFileRoute } from "@tanstack/react-router";
import { profileContent } from "@/config/profile";
import { siteMetadata } from "@/config/site";

function buildPortfolioSummary() {
	const work = profileContent.workExperience
		.map((item) => {
			const dates = [item.startDate, item.endDate ?? "Present"].join("–");
			return `- ${item.role}, ${item.company} (${dates}): ${item.description}`;
		})
		.join("\n");

	const projects = profileContent.projects
		.map((item) => `- [${item.name}](${item.url}): ${item.description}`)
		.join("\n");

	const profiles = profileContent.socialProfiles
		.map((item) => `- [${item.name}](${item.url})`)
		.join("\n");

	return `# ${profileContent.name}\n\n> ${siteMetadata.description}\n\nThis is the plain-text guide to ${profileContent.name}'s portfolio. The main site is ${siteMetadata.origin}.\n\n## Work\n\n${work}\n\n## Projects\n\n${projects}\n\n## Contact and profiles\n\n- Email: ${profileContent.contactEmail}\n${profiles}\n`;
}

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: async () =>
				new Response(buildPortfolioSummary(), {
					headers: {
						"Cache-Control": "public, max-age=3600",
						"Content-Type": "text/plain; charset=utf-8",
					},
				}),
		},
	},
});
