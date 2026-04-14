export type WorkExperience = {
	company: string;
	role: string;
	startDate: string;
	endDate?: string;
	description: string;
	logoUrl: string;
};

export type ProjectLink = {
	name: string;
	description: string;
	url: string;
};

export type SocialProfile = {
	name: string;
	url: string;
};

import type { FileRouteTypes } from "@/routeTree.gen";

export type HeadlineSegment = {
	text: string;
	to?: FileRouteTypes["to"];
};

export type ProfileContent = {
	name: string;
	headline: HeadlineSegment[];
	contactEmail: string;
	workExperience: WorkExperience[];
	projects: ProjectLink[];
	socialProfiles: SocialProfile[];
};
