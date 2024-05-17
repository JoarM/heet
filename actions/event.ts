"use server"

import { validateRequest } from "@/data/user"
import { db } from "@/db"
import { eventTable } from "@/db/schema"
import { newEventValidator } from "@/lib/validations"
import { eq, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createEvent(_: any, formData: FormData) {
    const title = formData.get("title")
    const description = formData.get("description")
    const activity = formData.get("activity")
    const from = new Date(formData.get("from")?.toString() ?? "")
    const to = new Date(formData.get("to")?.toString() ?? "")
    const lat = Number(formData.get("lat")?.toString() ?? "")
    const lng = Number(formData.get("lng")?.toString() ?? "")

    const { user } = await validateRequest()

    if (!user) {
        return {
            message: "Logga in för att publicera ett event"
        }
    }

    const parse = await newEventValidator.safeParseAsync({
        title: title,
        description: description,
        activity: activity,
        from: from,
        to: to,
        lat: lat,
        lng: lng
    })

    if (!parse.success) {
        const error = parse.error.flatten().fieldErrors
        console.log(error)
        return {
            error
        }
    }

    try {
        await db.insert(eventTable)
        .values({
            title: parse.data.title,
            description: parse.data.description,
            activity: parse.data.activity,
            from: parse.data.from,
            to: parse.data.to,
            host_id: user.id,
            latitude: lat,
            longitude: lng
        })
        revalidatePath("/")
    } catch (err: any) {
        return {
            message: "Ett oväntat fel uppstod"
        }
    }
}

export async function deleteEvent(id: number) {
    try {
        await db.delete(eventTable).where(eq(eventTable.id, id))
    } catch (err: any) {
        return {
            error: {
                message: "Ett oväntat fel uppstod"
            }
        }
    }
}

export async function getEvents(filters?: {
    activity?: string[],
}) {
    try {
        const events = await db.select().from(eventTable).where(filters?.activity && inArray(eventTable.activity, filters.activity))
        return {
            data: events
        }
    } catch (err: any) {
        return {
            error: "Myslyckades med att ladda event"
        }
    }
}