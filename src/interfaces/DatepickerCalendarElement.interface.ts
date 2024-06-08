import type dayjs from 'dayjs';

export default interface DatepickerCalendarElement {
    days?: {day: dayjs.Dayjs, isToday: boolean, isSelected: boolean, isCurrentMonth: boolean}[],
    months?: dayjs.Dayjs[],
    years?: dayjs.Dayjs[],
    year?: dayjs.Dayjs
    month?: dayjs.Dayjs
    from?: dayjs.Dayjs
    to?: dayjs.Dayjs
}