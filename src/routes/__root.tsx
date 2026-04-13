import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { lazy, Suspense } from "react";

const Analytics = lazy(() =>
	import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
);

import ErrorPage from "@/components/error-page";
import NotFound from "@/components/not-found";
import { siteMetadata } from "@/config/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "theme-color", content: "#111110" },
			{ title: siteMetadata.title },
			{ name: "description", content: siteMetadata.description },
			{ name: "robots", content: siteMetadata.robots },
			{ name: "author", content: siteMetadata.name },
			{ name: "creator", content: siteMetadata.name },
			{ name: "publisher", content: siteMetadata.name },
			{ property: "og:site_name", content: siteMetadata.name },
			{ property: "og:locale", content: siteMetadata.locale },
			{ name: "twitter:url", content: siteMetadata.origin },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: siteMetadata.twitterHandle },
			{ name: "twitter:creator", content: siteMetadata.twitterHandle },
			{ name: "color-scheme", content: "dark" },
		],
		links: [
			{
				rel: "preload",
				href: "/fonts/Satoshi-Variable.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
		],
		styles: [
			{
				children: `@font-face {
	font-family: "Satoshi";
	src: url("/fonts/Satoshi-Variable.woff2") format("woff2");
	font-weight: 300 900;
	font-display: swap;
}`,
			},
		],
	}),
	errorComponent: ({ error }) => (
		<ErrorPage
			title="Something went wrong"
			description={error.message || "An unexpected error occurred."}
		/>
	),
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
	shellComponent: RootDocument,
});

function RootComponent() {
	return <Outlet />;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
				>
					Skip to main content
				</a>
				{children}
				<Suspense fallback={null}>
					<Analytics />
				</Suspense>
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
