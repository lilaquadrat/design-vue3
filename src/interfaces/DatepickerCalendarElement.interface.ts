import type dayjs from 'dayjs';
import type DatepickerCalendarDay from './DatepickerCalendarDay.interface';

export default interface DatepickerCalendarElement {
    days?: DatepickerCalendarDay[]
    months?: dayjs.Dayjs[]
    years?: dayjs.Dayjs[]
    year?: dayjs.Dayjs
    month?: dayjs.Dayjs
    from?: dayjs.Dayjs
    to?: dayjs.Dayjs
}