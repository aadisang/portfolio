type PostProps = {
	slug: string;
	title: string;
	date: string;
};

export default function Post({ slug, title, date }: PostProps) {
	return (
		<a
			href={`/writing/${slug}`}
			className="group flex items-baseline justify-between gap-4 px-3 py-3 transition-colors duration-200 ease-out pointer-fine:hover:bg-(--hover-overlay) focus-ring"
		>
			<span className="text-foreground hover-underline">{title}</span>
			<time className="text-sm text-muted-foreground shrink-0 tabular-nums">
				{date}
			</time>
		</a>
	);
}
