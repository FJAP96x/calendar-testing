import { dateFnsLocalizer } from 'react-big-calendar';
// import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US'


const locales = {
  'es': es,
  "en": enUS
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});





