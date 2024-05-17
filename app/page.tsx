import { getEvents } from "@/actions/event";
import { CustomPin } from "@/components/custom-pin";
import { HeetMap } from "@/components/heet-map";

export default async function Page() {
  const events = await getEvents()

  return (
    <HeetMap>
      {events.data && (
        <>
          {events.data.map((event) => {
            return (
              <CustomPin 
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
      <CustomPin 
      lat={57.72}
      lng={12.943874899999987}
      title="Eating MCdonalds"
      category="food"
      startTime="00:00"
      endTime="02:00"
      description="bilgun is buying Mcdownalds and we eat very good yes yes"
      />
    </HeetMap>
  )
}