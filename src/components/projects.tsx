import type { ProjectLink } from "@/types/profile";

type ProjectsProps = {
	items: ProjectLink[];
};

export default function Projects({ items }: ProjectsProps) {
	return (
		<ul className="-mx-3 space-y-1 enter-list">
			{items.map((project) => (
				<li key={`${project.name}:${project.url}`} className="enter">
					<a
						href={project.url}
						target="_blank"
						rel="noreferrer noopener"
						className="group block px-3 py-3 transition-colors duration-200 ease-out pointer-fine:hover:bg-(--hover-overlay) focus-ring"
					>
						<div className="flex items-center gap-1.5">
							<span className="text-foreground hover-underline">
								{project.name}
							</span>
							<svg
								viewBox="0 0 256 256"
								className="size-3.5 text-muted-foreground hover-slide-in"
								aria-hidden="true"
							>
								<path
									fill="currentColor"
									d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8"
								/>
							</svg>
						</div>
						<p className="mt-1 text-sm text-muted-foreground sm:line-clamp-2">
							{project.description}
						</p>
					</a>
				</li>
			))}
		</ul>
	);
}
