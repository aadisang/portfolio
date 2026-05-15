import type { ProfileContent } from "@/types/profile";

export const profileContent: ProfileContent = {
	name: "Aadi Sanghvi",
	headline: [
		{
			text: "I'm a student and super enthusiastic about tech. You'll find me working on whatever I find interesting at the moment and occasionally, ",
		},
		{ text: "writing" },
		{ text: "." },
	],
	contactEmail: import.meta.env.VITE_CONTACT_EMAIL,
	workExperience: [
		{
			company: "Palantir",
			role: "Meritocracy Fellow",
			startDate: "Aug 2026",
			endDate: "Dec 2026",
			description: "Software engineer intern.",
			logoUrl: "/work/palantir.svg",
		},
		{
			company: "Spare Studio",
			role: "Founder",
			startDate: "Aug 2024",
			description: "Freelance web development.",
			logoUrl: "/work/spare-studio.svg",
		},
		{
			company: "Doastly",
			role: "Junior Software Engineer",
			startDate: "Jan 2024",
			endDate: "Dec 2025",
			description: "Pet salon management startup.",
			logoUrl: "/work/doastly.svg",
		},
	],
	projects: [
		{
			name: "Open Attendance",
			description:
				"An open-source attendance system for every kind of event. Think club meetings, coffee mixers, etc. (500+ users, including my school).",
			url: "https://github.com/sinarck/open-attendance",
		},
		{
			name: "Hand Wave",
			description:
				"A simple real-time ASL translation app built with the Ray-Ban Meta glasses. Presented to students at the Texas School for the Deaf.",
			url: "https://github.com/sinarck/hand-wave",
		},
		{
			name: "Storm Shield",
			description:
				"A mobile app streamlining volunteer coordination and recruitment for organizations, such as in disaster-response scenarios. Got to demo at the U.S. Capitol and to my congressman (Rep. Self).",
			url: "https://www.stormshield.app",
		},
	],
	socialProfiles: [
		{
			name: "GitHub",
			url: "https://github.com/sinarck",
		},
		{
			name: "LinkedIn",
			url: "https://linkedin.com/in/aadisanghvi",
		},
		{
			name: "X",
			url: "https://x.com/aadisanghv",
		},
	],
};
