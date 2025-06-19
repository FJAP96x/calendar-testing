export const events = [{
  id: "1",
  start: new Date("2025-10-11 13:00:00"),
  end: new Date("2025-10-11 15:00:00"),
  title: " cumpleaños de frank",
  notes: "comprar pastel",

}
  , {
  id: "2",
  start: new Date("2025-11-19 13:00:00"),
  end: new Date("2025-11-19 15:00:00"),
  title: " cumpleaños de lluna ",
  notes: "comprar pastel",

}]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}
export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null
}
export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: {...events[0] }
}