import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/config/site";

export const Route = createFileRoute("/writing")({
	head: () => ({
		meta: [{ title: formatTitle("Writing") }],
	}),
	component: WritingPage,
});

function WritingPage() {
	return null;
}
