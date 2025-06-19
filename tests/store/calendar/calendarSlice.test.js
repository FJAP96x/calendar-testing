import { describe, test, expect } from "vitest";
import { calendarSlice, onAddNewEvent, onClearLogout, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe("test in calendarSlice", () => {
  test("should be return the initial state", () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })

  test("onSetActiveEvent", () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
    expect(state.activeEvent).toEqual(events[0])
  })
  test("onAddnewEvent should be add the event", () => {
    const newEvent = {
      id: "3",
      start: new Date("2025-10-11 13:00:00"),
      end: new Date("2025-10-11 15:00:00"),
      title: "cumpleaños 3",
      notes: "cumpleaños de la tía",
    }
    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
    expect(state.events).toEqual([...events, newEvent]);
  })

  test("onUpdateEvent should be update the event", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2025-10-11 13:00:00"),
      end: new Date("2025-10-11 15:00:00"),
      title: "cumpleaños de frank ACTUALIZADO",
      notes: "nota actualizada ",
    }
    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent))
    expect(state.events).toContain(updatedEvent);
  })

  test("onDeleteEvent should be delete the active event ", () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  })
  test("onLoadEvents should be load the events", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events))
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events)
    const newState = calendarSlice.reducer(state, onLoadEvents(events))
    expect(newState.events.length).toBe(events.length);


  })

  test("onLogout should be clean the state", () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, onClearLogout())
    expect(state).toEqual(initialState)

  })
}) 