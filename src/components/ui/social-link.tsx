import type { SocialProfile } from "@/types/profile";

export default function SocialLink({ name, url }: SocialProfile) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noreferrer noopener"
			className="inline-flex min-h-11 items-center text-sm link-muted press-scale focus-ring"
		>
			{name}
		</a>
	);
}
