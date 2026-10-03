import SocialLink from "@/components/ui/social-link";
import type { SocialProfile } from "@/types/profile";

type FooterProps = {
	socialProfiles: SocialProfile[];
	contactEmail: string;
};

export default function Footer({ socialProfiles, contactEmail }: FooterProps) {
	return (
		<footer>
			<hr className="border-border" />
			<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-10 lg:pt-8">
				<a
					href={`mailto:${contactEmail}`}
					className="inline-flex min-h-11 items-center text-sm link-muted press-scale focus-ring"
				>
					<span className="sm:hidden">Email</span>
					<span className="hidden sm:inline">
						{contactEmail.replace("@", " [at] ").replace(/\./g, " [dot] ")}
					</span>
				</a>
				<nav
					aria-label="Social links"
					className="flex flex-wrap items-center gap-x-4 gap-y-2"
				>
					{socialProfiles.map((socialProfile) => (
						<SocialLink key={socialProfile.url} {...socialProfile} />
					))}
				</nav>
			</div>
		</footer>
	);
}
