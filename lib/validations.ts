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