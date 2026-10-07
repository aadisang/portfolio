import type { ProjectLink } from "@/types/profile";

type ProjectsProps = {
	items: ProjectLink[];
};

export default function Projects({ items }: ProjectsProps) {
	return (
		<ul className="-mx-3 space-y-1">
			{items.map((project) => (
				<li
					key={`${project.name}:${project.url}`}
					className="group relative px-3 py-3 transition-colors duration-150 ease-[ease] active:bg-(--hover-overlay) pointer-fine:hover:bg-(--hover-overlay) focus-ring"
				>
					<h3 className="flex items-center gap-1.5">
						<a
							href={project.url}
							target="_blank"
							rel="noreferrer noopener"
							className="text-foreground after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-transparent"
						>
							<span className="hover-underline">{project.name}</span>
						</a>
						<svg
							viewBox="0 0 256 256"
							className="size-3.5 pointer-events-none text-muted-foreground hover-slide-in"
							aria-hidden="true"
						>
							<path
								fill="currentColor"
								d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8"
							/>
						</svg>
					</h3>
					<p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground sm:line-clamp-2">
						{project.mobileDescription ? (
							<>
								<span className="sm:hidden">{project.mobileDescription}</span>
								<span className="hidden sm:inline">{project.description}</span>
							</>
						) : (
							project.description
						)}
					</p>
				</li>
			))}
		</ul>
	);
}
