import type { SocialProfile } from "@/types/profile";

export default function SocialLink({ name, url }: SocialProfile) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noreferrer noopener"
			className="text-sm link-muted focus-ring"
		>
			{name}
		</a>
	);
}
