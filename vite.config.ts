import { fileURLToPath, URL } from "node:url";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { loadEnv } from "vite-plus";
import { defineConfig } from "vite-plus";

const env = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

const toolingIgnorePatterns = [
	".output/**",
	".vite-hooks/**",
	".vinxi/**",
	".zed/**",
	"dist/**",
	"src/routeTree.gen.ts",
];

const config = defineConfig({
	fmt: {
		ignorePatterns: toolingIgnorePatterns,
		printWidth: 80,
		useTabs: true,
	},
	staged: {
		"*.{js,jsx,ts,tsx}": "vp check --fix",
		"*.{css,json,jsonc,md,mdx,yaml,yml}": "vp fmt",
	},
	lint: {
		ignorePatterns: toolingIgnorePatterns,
		plugins: [
			"import",
			"jsx-a11y",
			"oxc",
			"promise",
			"react",
			"typescript",
			"unicorn",
		],
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
	build: {
		cssMinify: "lightningcss",
		rolldownOptions: {
			output: {
				minify: env.NODE_ENV === "production" && {
					compress: {
						dropConsole: true,
						dropDebugger: true,
					},
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	plugins: [
		devtools(),
		nitro(),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoSubfolderIndex: true,
				autoStaticPathsDiscovery: true,
				concurrency: 8,
				crawlLinks: true,
				failOnError: true,
				retryCount: 1,
				retryDelay: 250,
			},
			sitemap: {
				enabled: true,
				host: env.VITE_SITE_URL,
			},
		}),
		viteReact(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
});

export default config;
