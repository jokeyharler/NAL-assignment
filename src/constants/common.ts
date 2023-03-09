export const REGEX = {
  url: /(^http(s?):\/\/[^\s$.?#].[^\s]*)/i,
};

export const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Events API",
			version: "1.0.0",
			description: "A simple event management API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["src/controllers/*.controller.ts"],
}; 