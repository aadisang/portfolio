import type { SocialProfile } from "@/types/profile";

export default function SocialLink({ name, icon: Icon, url }: SocialProfile) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noreferrer noopener"
			aria-label={`${name} (opens in new tab)`}
			className="link-muted focus-ring press-scale"
		>
			<Icon className="size-5" aria-hidden="true" />
		</a>
	);
}
