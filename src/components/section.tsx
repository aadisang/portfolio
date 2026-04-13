import type { ReactNode } from "react";

type SectionProps = {
	label: string;
	children: ReactNode;
};

export default function Section({ label, children }: SectionProps) {
	return (
		<section className="mb-10 lg:mb-8 enter-group">
			<h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 enter">
				{label}
			</h2>
			{children}
		</section>
	);
}
