import { getEvents } from "@/actions/event";
import { CustomPin } from "@/components/custom-pin";
import { HeetMap } from "@/components/heet-map";

export const dynamic = 'force-dynamic'

export default async function Page() {
  const events = await getEvents()

  return (
    <HeetMap>
      {events.data && (
        <>
          {events.data.map((event) => {
            return (
              <CustomPin
              key={event.id} 
              lat={event.latitude}
              lng={event.longitude}
              title={event.title}
              category={event.activity}
              startTime={`${event.from.toLocaleDateString("sv-se")} ${event.from.toLocaleTimeString("sv-se", { hour: "2-digit", minute: "2-digit" })}`}
              endTime={`${event.to.toLocaleDateString("sv-se")} ${event.to.toLocaleTimeString("sv-se", { hour: "2-digit", minute: "2-digit" })}`}
              description={event.description}
              />
            )
          })}
        </>
        
      )}
    </HeetMap>
  )
}