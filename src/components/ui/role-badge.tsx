type RoleBadgeProps = {
	role: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
	return (
		<span className="inline-flex max-w-full shrink-0 items-center text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-foreground/6 leading-4 select-none">
			{role}
		</span>
	);
}
