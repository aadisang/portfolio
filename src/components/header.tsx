import { Link } from "@tanstack/react-router";
import type { HeadlineSegment } from "@/types/profile";

type HeaderProps = {
	displayName: string;
	headline: HeadlineSegment[];
};

export default function Header({ displayName, headline }: HeaderProps) {
	return (
		<header className="mb-10 lg:mb-8">
			<h1 className="text-base font-semibold tracking-tight text-pretty">
				{displayName}
			</h1>
			<p className="mt-3 max-w-[65ch] text-balance text-muted-foreground">
				{headline.map((seg) =>
					seg.to ? (
						<Link
							key={seg.to}
							to={seg.to}
							className="text-foreground underline decoration-muted-foreground/30 underline-offset-4 decoration-from-font [text-underline-position:from-font]"
						>
							{seg.text}
						</Link>
					) : (
						seg.text
					),
				)}
			</p>
		</header>
	);
}
