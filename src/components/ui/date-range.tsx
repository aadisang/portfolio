type DateRangeProps = {
	startDate: string;
	endDate?: string;
};

function formatDate(date: string): string {
	const [month, year] = date.split(" ");
	return `${month} '${year.slice(-2)}`;
}

export default function DateRange({ startDate, endDate }: DateRangeProps) {
	const end = endDate ? formatDate(endDate) : "Present";

	return (
		<div className="hidden sm:grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 text-xs tabular-nums leading-none select-none">
			<span className="text-muted-foreground text-center px-1.5 py-1 rounded bg-foreground/4">
				{formatDate(startDate)}
			</span>
			<span className="text-muted-foreground/40">→</span>
			<span className="text-muted-foreground text-center px-1.5 py-1 rounded bg-foreground/4">
				{end}
			</span>
		</div>
	);
}
