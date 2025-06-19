/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPages = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;
    // console.log(event);
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor:  isMyEvent ? "#347CF7":" #465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };
  const onSelect = (e) => {
    console.log({ click: e });
    setActiveEvent(e);
  };
  const onViewChanged = (e) => {
    localStorage.setItem("lastview", e);
    setLastView(e);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
