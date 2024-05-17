import z from "zod";

export const newEventValidator = z.object({
    title: z.string().min(3, "Ge ditt event en titel").max(64, "Event titlar får inte överskrida 64 karaktärer"),
    description: z.string().min(3, "Ge ditt event en beskrivning").max(512, "Event titlar får inte överskrida 512 karaktärer"),
    activity: z.enum(["food", "bar", "fishing", "theater", "music", "movie", "gym", "games"]),
    from: z.date({ required_error: "Välj ett start datum för ditt event" }),
    to: z.date({ required_error: "Välj ett start datum för ditt event" }),
    lng: z.number().min(-180, "Välj korrekta kordinater").max(180, "Välj korrekta kordinater"),
    lat: z.number().min(-180, "Välj korrekta kordinater").max(180, "Välj korrekta kordinater")
})

export const loginValidator = z.object({
    username: z.string().min(1, "Fyll i ditt användarnamn").max(128, "Användarnamn kan max vara 128 karaktärer"),
    password: z.string().min(1, "Fyll i ditt lösenord")
})

export const signupValidator = z.object({
    username: z.string().min(1, "Fyll i ett användarnamn").max(128, "Användarnamn kan max vara 128 karaktärer"),
    password: z.string()
	.min(6, "Lösenord måste vara minst 6 karaktärer långt. ")
	.max(64, "Lösenord får inte vara mer än 64 karaktärer långt. ")
	.regex(/[A-Z]/, { message: "Lösenord måste innehålla en stor bokstav. " })
	.regex(/[a-z]/, { message: "Lösenord måste innehålla en liten bokstav. " })
	.regex(/[0-9]/, { message: "Lösenord måste innehålla en siffra. " }),
    email: z.string().email("Fyll i en giltig e-post address"),
    displayName: z.string().min(1, "Fyll ett visnings namn").max(128, "Visnings namn får max vara 128 karaktärer långt"),
    country: z.string().min(1, "Välj ett land")
})