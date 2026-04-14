import { createFileRoute, Link } from "@tanstack/react-router";
import Post from "@/components/ui/post";
import { formatTitle } from "@/config/site";

export const Route = createFileRoute("/writing")({
	head: () => ({
		meta: [{ title: formatTitle("Writing") }],
	}),
	component: WritingPage,
});

const posts = [
	{
		slug: "hello-world",
		title: "Hello, world",
		date: "Apr 2026",
	},
];

function WritingPage() {
	return (
		<main
			id="main-content"
			className="page-stagger max-w-2xl lg:max-w-3xl mx-auto px-6 min-h-dvh flex flex-col pt-12 pb-8 lg:py-8"
		>
			<header className="mb-4 enter-group">
				<Link
					to="/"
					className="inline-block text-sm link-muted focus-ring enter"
				>
					← Home
				</Link>
				<h1 className="mt-6 text-base font-semibold tracking-tight enter">
					Writing
				</h1>
			</header>

			<ul className="-mx-3 space-y-1 enter-list">
				{posts.map((post) => (
					<li key={post.slug} className="enter">
						<Post {...post} />
					</li>
				))}
			</ul>
		</main>
	);
}
