import DateRange from "@/components/ui/date-range";
import RoleBadge from "@/components/ui/role-badge";
import type { WorkExperience } from "@/types/profile";

type ExperiencesProps = {
	items: WorkExperience[];
};

export default function Experiences({ items }: ExperiencesProps) {
	return (
		<ul className="grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-x-4 gap-y-6">
			{items.map((experience) => (
				<li
					key={`${experience.company}:${experience.startDate}`}
					className="grid grid-cols-subgrid col-span-full items-center wrap-anywhere"
				>
					<img
						src={experience.logoUrl}
						alt={`${experience.company} logo`}
						width={40}
						height={40}
						loading="eager"
						className="size-10 rounded object-contain row-span-2 self-center select-none pointer-events-none"
					/>
					<div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-1 self-end">
						<span className="text-foreground leading-none">
							{experience.company}
						</span>
						<RoleBadge role={experience.role} />
					</div>
					<DateRange {...experience} />
					<p className="col-start-2 sm:col-span-2 self-start mt-1 text-sm leading-relaxed text-pretty text-muted-foreground sm:line-clamp-2">
						{experience.description}
					</p>
				</li>
			))}
		</ul>
	);
}
