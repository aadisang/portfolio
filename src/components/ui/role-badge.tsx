type RoleBadgeProps = {
	role: string;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
	return (
		<span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-foreground/6 leading-none select-none">
			{role}
		</span>
	);
}
