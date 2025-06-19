import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store"
import { calendarApi } from "../api"
import { convertEventsToDate } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //TODO: llegar al backend
    try {

      //TODO: todo bien
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        // Updating 
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }
      // Creating
      const { data } = await calendarApi.post('/events', calendarEvent)
      console.log({ data });
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    } catch (error) {
      console.log(error);
      Swal.fire("Error saving event:", error.response.data.msg, error);
    }


  }

  const startDeletingEvent = async () => {
    //TODO: llegar al backend
    try {
      await calendarApi.delete((`/events/${activeEvent.id}`))
      dispatch(onDeleteEvent())

    } catch (error) {
      console.log(error);
      Swal.fire("Error deleting event:", error.response.data.msg, error);

    }

  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDate(data.events)
      //console.log(events);
      dispatch(onLoadEvents(events)) // Dispatch the loaded events to the store

    }


    catch (error) {
      console.log("Error loading events:", error);
      console.log(error);
    }
  }

  return {
    //*properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //*methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
