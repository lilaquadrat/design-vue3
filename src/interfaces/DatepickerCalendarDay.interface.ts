import type dayjs from 'dayjs';

export default interface DatepickerCalendarDay {
    day?: dayjs.Dayjs 
    isToday?: boolean 
    isCurrentMonth?: boolean
    isFrom?: boolean
    isTo?: Boolean
    inRange?: Boolean
    isBefore?: Boolean
    isAfter?: Boolean
}