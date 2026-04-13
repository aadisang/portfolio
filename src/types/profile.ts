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

export type ProfileContent = {
	name: string;
	headline: string;
	contactEmail: string;
	workExperience: WorkExperience[];
	projects: ProjectLink[];
	socialProfiles: SocialProfile[];
};
