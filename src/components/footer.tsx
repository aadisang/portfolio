import SocialLink from "@/components/ui/social-link";
import type { SocialProfile } from "@/types/profile";

type FooterProps = {
	socialProfiles: SocialProfile[];
	contactEmail: string;
};

export default function Footer({ socialProfiles, contactEmail }: FooterProps) {
	return (
		<footer className="enter-group">
			<hr className="border-border origin-left enter-grow-x" />
			<div className="flex items-center justify-between pt-10 lg:pt-8 enter">
				<a
					href={`mailto:${contactEmail}`}
					className="text-sm link-muted focus-ring"
				>
					<span className="sm:hidden">Email</span>
					<span className="hidden sm:inline">
						{contactEmail.replace("@", " [at] ").replace(/\./g, " [dot] ")}
					</span>
				</a>
				<nav aria-label="Social links" className="flex items-center gap-4">
					{socialProfiles.map((socialProfile) => (
						<SocialLink key={socialProfile.url} {...socialProfile} />
					))}
				</nav>
			</div>
		</footer>
	);
}
