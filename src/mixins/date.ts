import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Returns a dayjs instance with the timezone set to Berlin
 * 
 * @param date Optional date parameter to initialize the dayjs instance with
 * @returns A dayjs instance with Berlin timezone
 */
export function useDate (date?: string | number | Date | dayjs.Dayjs) {
  return dayjs(date).tz('Europe/Berlin');
}

export default useDate;