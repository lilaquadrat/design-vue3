<script setup lang="ts">
import type DatepickerCalendarElement from '@/interfaces/DatepickerCalendarElement.interface';
import { useResize } from '@/plugins/resize';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(isBetween)
dayjs.locale('de');

import { computed, onBeforeMount, ref, watch } from 'vue';
import type DatepickerCalendarDay from '@/interfaces/DatepickerCalendarDay.interface';
import type IconsPartial from '@/interfaces/IconsPartial.interface';

defineOptions({ inheritAttrs: false });

const fromModel = defineModel<Date | string>('from');
const toModel = defineModel<Date | string>('to');
const props = defineProps<{
    from?: Date | string
    to?: Date | string
    monthVisible?: number
    stayOpenOnSelect?: boolean
    range?: boolean
    future?: boolean
    past?: boolean
    after?: Date | string
    before?: Date | string
    icon?: IconsPartial['type'],
    time?: boolean
    seconds?: boolean
}>();
const { media, resized } = useResize();
/**
 * working dates from
 */
const tempDayFrom = ref<string>('00');
const tempMonthFrom = ref<string>('00');
const tempYearFrom = ref<string>('0000');
const tempHoursFrom = ref<string>('00');
const tempMinutesFrom = ref<string>('00');
const tempSecondsFrom = ref<string>('00');
const tempDateFrom = ref<dayjs.Dayjs>();
/**
 * working dates to
 */
const tempDayTo = ref<string>('00');
const tempMonthTo = ref<string>('00');
const tempYearTo = ref<string>('0000');
const tempHoursTo = ref<string>('00');
const tempMinutesTo = ref<string>('00');
const tempSecondsTo = ref<string>('00');
const tempDateTo = ref<dayjs.Dayjs>();
/**
 * date that is currently hovered
 */
const hoverDate = ref<dayjs.Dayjs>();
/**
 * date that is was hovered before
 */
const whitelistedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete', 'Tab'];
/**
 * references to the input elements for from
 */
const hoursFrom = ref<HTMLInputElement>();
const minutesFrom = ref<HTMLInputElement>();
const secondsFrom = ref<HTMLInputElement>();
const dayFrom = ref<HTMLInputElement>();
const monthFrom = ref<HTMLInputElement>();
const yearFrom = ref<HTMLInputElement>();
/**
 * references to the input elements for to
 */
const hoursTo = ref<HTMLInputElement>();
const minutesTo = ref<HTMLInputElement>();
const secondsTo = ref<HTMLInputElement>();
const dayTo = ref<HTMLInputElement>();
const monthTo = ref<HTMLInputElement>();
const yearTo = ref<HTMLInputElement>();
/**
 * references to scoll container for time selection
 */
const hoursScroll = ref<HTMLInputElement>();
const minutesScroll = ref<HTMLInputElement>();
const secondsScroll = ref<HTMLInputElement>();
const timeScrollElements = ref({
  hours  : hoursScroll,
  minutes: minutesScroll,
  seconds: secondsScroll,
})
/**
 * array of all input references for focus the next input element
 */
// const inputElements = [dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo];
const calendarElements = ref<any>({});
const useMonthForCalender = ref();
const calculatedOptions = ref();
const triggerElement = ref<HTMLElement>();
const calendarContainer = ref<HTMLElement>();
const datepickerElement = ref<HTMLElement>();
const renderCalendar = ref<boolean>(false);
/**
 * on mobile monthVisible 6 will be overwritten by three
 * this variable is aware of that behaviour
 */
const monthVisibleMediaAware = ref<number>(1);
/**
 * defines what will be rendered in the calendaro overviwe
 */
const mode = ref<'days' | 'month' | 'years'>('days');
const calendarMode = ref<'date' | 'time'>('date');
const timeTarget = ref<'from'|'to'>('from');
/**
 * used as working date on hover
 */
const useFrom = ref<dayjs.Dayjs>();
const useTo = ref<dayjs.Dayjs>();
/**
 * defines which date is changed on click in the calendar
 */
const selectMode = ref<'from'|'to'>('from');
/**
 * a click on the from/to date in range mode activates the static move mode 
 */
const staticMode = ref<'from'|'to'>();
const scrollTimout = ref();

onBeforeMount(() => {
  
  setTemp(props.from, 'from', true, true);
  setTemp(props.to, 'to', true, true);
  setmonthVisibleMediaAware();

});
watch(() => fromModel.value, () => setTemp(fromModel.value, 'from', true, true)); 
watch(() => toModel.value, () => setTemp(toModel.value, 'to', true, true)); 
watch(() => [tempHoursFrom.value, tempMinutesFrom.value, tempSecondsFrom.value, tempDayFrom.value, tempMonthFrom.value, tempYearFrom.value], () => update('from')); 
watch(() => [tempHoursTo.value, tempMinutesTo.value, tempSecondsTo.value, tempDayTo.value, tempMonthTo.value, tempYearTo.value], () => update('to')); 
watch(() => [resized.value, media.value], () => {

  calculateOptionsStyle();
  setmonthVisibleMediaAware();

});
watch(() => timeScrollElements, () => setTime(timeTarget.value), {deep: true})

const monthVisibleCss = computed(() => ({'--monthVisible': props.monthVisible || 1}));
const rangeDuration = computed(() => {

  const range = useTo.value?.endOf('day').diff(useFrom.value?.startOf('day'), 'day');

  return !range ? 0 : range < 0 ? -range : range;

});
const timeElementHeight = computed(() => {

  if(media.value === 'mobile') return 75;
  return 100;

});

function setmonthVisibleMediaAware () {

  monthVisibleMediaAware.value = props.monthVisible || 1;
  if(props.monthVisible === 6 && (media.value === 'mobile' || media.value === 'tablet')) monthVisibleMediaAware.value = 3;

  updateMonth();

}

function setTemp (baseDate?: Date | string | dayjs.Dayjs, target: 'from' | 'to' = 'from', updateCalendarMonth: boolean = true, updateTime = false) {

  const date = baseDate ? dayjs(baseDate).clone() : dayjs();

  if(target === 'from') {
    
    if(updateTime) {

      tempHoursFrom.value = date.get('hours').toString().padStart(2, '0');
      tempMinutesFrom.value = date.get('minutes').toString().padStart(2, '0');
      tempSecondsFrom.value = date.get('seconds').toString().padStart(2, '0');
    }

    tempDayFrom.value = date.get('date').toString().padStart(2, '0');
    tempMonthFrom.value = (date.get('month') + 1).toString().padStart(2, '0');
    tempYearFrom.value = date.get('year').toString();
  
    // tempDateFrom.value = date;
    tempDateFrom.value = dayjs()
      .set('date', +tempDayFrom.value)
      .set('month', +tempMonthFrom.value - 1)
      .set('year', +tempYearFrom.value)
      .set('hours', +tempHoursFrom.value)
      .set('minutes', +tempMinutesFrom.value)
      .set('seconds', +tempSecondsFrom.value);

  }

  if(target === 'to') {

    if(updateTime) {

      tempHoursTo.value = date.get('hours').toString().padStart(2, '0');
      tempMinutesTo.value = date.get('minutes').toString().padStart(2, '0');
      tempSecondsTo.value = date.get('seconds').toString().padStart(2, '0');
    }

    tempDayTo.value = date.get('date').toString().padStart(2, '0');
    tempMonthTo.value = (date.get('month') + 1).toString().padStart(2, '0');
    tempYearTo.value = date.get('year').toString();
    
    // tempDateTo.value = date;
    tempDateTo.value = dayjs()
      .set('date', +tempDayTo.value)
      .set('month', +tempMonthTo.value - 1)
      .set('year', +tempYearTo.value)
      .set('hours', +tempHoursTo.value)
      .set('minutes', +tempMinutesTo.value)
      .set('seconds', +tempSecondsTo.value);

  }

  if(updateCalendarMonth && !!tempDateFrom.value) setCalendarMonth(tempDateFrom.value);
  updateUseFromTo();
  if(!props.range) updateMonth();
  
}

function emitDate (target: 'from' | 'to' = 'from') {
  
  if(target === 'from') fromModel.value = tempDateFrom.value?.toDate();
  if(target === 'to') toModel.value = tempDateTo.value?.toDate();

}

function checkInput (type: 'hours' | 'minutes' | 'seconds' | 'date' | 'month' | 'year', input: KeyboardEvent, target: 'from' | 'to' = 'from') {
  
  if (whitelistedKeys.includes(input.key)) return;

  const element = input.target as HTMLInputElement;
  const newDate = target === 'from' ? tempDateFrom.value?.clone() : tempDateTo.value?.clone();
  let tempCompareDate = newDate;

  if(input.key === 'Escape') {

    element.blur();
    return;

  }

  // only numbers are allowed
  if (!input.key.match(/[0-9]/)) {

    input.preventDefault();
    return;

  }

  /**
   * month with there days matching the current year
   */
  const daysOfMonth = [];
  
  if(!element || !newDate) return;
  
  for (let month = 0; month < 12; month++) {
    
    daysOfMonth.push({month, days: dayjs().set('year', newDate.get('year')).set('month', month).daysInMonth()});

  }

  let tempValue: string;
  
  if(element.selectionStart !== null && element.selectionEnd && (element.selectionStart < element.selectionEnd)) {
      
    tempValue = input.key;
      
  } else {
        
    tempValue = element.value + input.key;
        
  }

  /**
  * only allow up to two digits for date and month
  * if only the leading zero is present, dont check any further
  */
  if(['hours', 'minutes', 'seconds', 'date', 'month'].includes(type)) {

    if(tempValue.length > 2) {

      input.preventDefault();
      return;

    }

    if(tempValue === '0' && tempValue.length === 1) return;  
    if(tempValue.length < 2) return;

  }

  /**
  * only allow up to four digits for year
  * if the tempValue is shorter then four digits, dont check any further
  */
  if(type === 'year') {

    if(tempValue.length > 4) {

      input.preventDefault();
      return;

    }

    if(tempValue.length < 4) return;

  }

  /**
  * this allows only dates that would result in a valid date
  * if the input date is not valid for this month, dont allow the input
  */
  if(type === 'date') {

    const targetMonth = daysOfMonth.find((single) => single.month === newDate?.get('month'));

    tempCompareDate = newDate.clone().set('date', +tempValue);

    if(!targetMonth) return;

    if(targetMonth?.days < +tempValue) {

      input.preventDefault();

      return;

    }

  }

  /**
  * this allows only dates that would result in a valid date
  * if the input month is not compatible with the current date, dont allow the input
  */
  if(type === 'month') {

    // subtract one because the value in the input field does not start with 0
    const selectedMonth = daysOfMonth.find((single) => single.month === +tempValue - 1);

    tempCompareDate = newDate.clone().set('month', +tempValue - 1);

    if(!selectedMonth || selectedMonth.days < +tempDayFrom.value) {

      input.preventDefault();
      return;

    }

  }

  /**
  * this allows only dates that would result in a valid date
  * the days of february are subject to change, due that we need to check if the input year still matches the days of february
  */
  if(type === 'year') {

    const daysOfTargetMonth = dayjs().set('date', +tempDayFrom.value).set('month', +tempMonthFrom.value - 1).set('year', +tempValue).daysInMonth();

    tempCompareDate = newDate.set('year', +tempValue);

    if(daysOfTargetMonth < +tempDayFrom.value) {

      input.preventDefault();
      return;

    }

  }

  if(type === 'hours') {

    if(+tempValue > 23) {

      input.preventDefault();
      return;

    }

    tempCompareDate = newDate.set('hours', +tempValue);

  }

  if(type === 'minutes' || type === 'seconds') {

    if(+tempValue > 59) {

      input.preventDefault();
      return;

    }

    tempCompareDate = newDate.set(type, +tempValue);

  }

  if(!tempCompareDate) return;

  if(props.range) {

    if(target === 'from') {

      if(tempCompareDate.isAfter(tempDateTo.value, !props.time ? 'date' : undefined)) {

        input.preventDefault();
        return;

      }

    }

    if(target === 'to') {

      if(tempCompareDate.isBefore(tempDateFrom.value, !props.time ? 'date' : undefined)) {

        input.preventDefault();
        return;

      }

    }

  }

  if(props.after || props.future) {

    const afterDate = dayjs(props.after);

    if(tempCompareDate.startOf('date').isBefore(afterDate)) {

      input.preventDefault();
      return;
    }

  }

}

function calculateOptionsStyle () {

  const element = triggerElement.value as HTMLElement;
  const calendarContainerElement = calendarContainer.value as HTMLElement;

  calculatedOptions.value = {
    '--monthVisible' : monthVisibleMediaAware.value,
    '--elementHeight': `${timeElementHeight.value}px`
  }

  if(element && calendarContainerElement && media.value !== 'mobile' && media.value !== 'tablet') {

    const bounds = element.getBoundingClientRect();
    const calendarBounds = calendarContainerElement.getBoundingClientRect();
    let top = bounds.top + element.offsetHeight;
    const positionTop = bounds.bottom + element.offsetHeight + calendarBounds.height + 50 > window.innerHeight;
    const positionLeft = bounds.left + calendarBounds.right > window.innerWidth;
    let left = bounds.left;

    if(positionTop) {

      top = bounds.top - 10 - calendarBounds.height;

    }

    if(positionLeft) {

      left = bounds.right - calendarBounds.width;

    }

    calculatedOptions.value.top = `${top}px`;
    calculatedOptions.value.left = `${left}px`;

  }

}

function toggleCalendar (open?: boolean, setCalendarMode: 'date' | 'time' = 'date', setTimeTarget?: 'from' | 'to') {

  calculateOptionsStyle();
  
  // reset to days view when opening the calendar
  mode.value = 'days';
  calendarMode.value = setCalendarMode;
  if(setTimeTarget) timeTarget.value = setTimeTarget;

  updateMonth();
  if(tempDateFrom.value) setCalendarMonth(tempDateFrom.value);

  if(open === undefined) {

    renderCalendar.value = !renderCalendar.value;

  } else {

    renderCalendar.value = open;

  }

  if(!renderCalendar.value) {

    emitDate('from');
    if(props.range) emitDate('to');

  }

}

function focus (input: FocusEvent) {

  const element = input.target as HTMLInputElement;

  element.select();

}

function blur (input: FocusEvent) {

  const element = input.target as HTMLInputElement;
  const type = element.classList[0];
  const requiredLength = ['dayFrom', 'dayTo', 'monthFrom', 'monthTo'].includes(type) 
    ? 2 
    : 4;

  if(!tempDateFrom.value) return;

  if(element.value.length !== requiredLength) {

    if(type === 'dayFrom') {

      tempDayFrom.value = tempDateFrom.value.get('date').toString().padStart(2, '0');

    }

    if(type === 'dayTo' && tempDateTo.value) {

      tempDayTo.value = tempDateTo.value.get('date').toString().padStart(2, '0');

    }

    if(type === 'monthFrom') {

      tempMonthFrom.value = (tempDateFrom.value.get('month') + 1).toString().padStart(2, '0');

    }

    if(type === 'monthTo' && tempDateTo.value) {

      tempMonthTo.value = (tempDateTo.value.get('month') + 1).toString().padStart(2, '0');

    }

    if(type === 'yearFrom') {

      tempYearFrom.value = (tempDateFrom.value.get('year')).toString();

    }

    if(type === 'yearTo' && tempDateTo.value) {

      tempYearTo.value = (tempDateTo.value.get('year')).toString();

    }

  }

}

/**
 * focus automatically the next input element unless the focus is already on the year
 */
function focusNext () {

  const orderArray = ['dayFrom', 'monthFrom', 'yearFrom'];
  const inputElements = [dayFrom, monthFrom, yearFrom];

  if(props.time) {

    orderArray.push(...['hoursFrom', 'minutesFrom']);
    inputElements.push(...[hoursFrom, minutesFrom]);
    
    if(props.seconds) {
      
      orderArray.push('secondsFrom');
      inputElements.push(secondsFrom);
      
    }
        
  }

  if(props.range) {

    orderArray.push(...['dayTo', 'monthTo', 'yearTo']);
    inputElements.push(...[dayTo, monthTo, yearTo]);

    if(props.time) {

      orderArray.push(...['hoursTo', 'minutesTo'])
      inputElements.push(...[hoursTo, minutesTo]);
      
      if(props.seconds) {
        
        orderArray.push('secondsTo');
        inputElements.push(secondsTo);
  
      }
    
    }

  }

  const currentFocus = document.activeElement;

  if(currentFocus?.nodeName !== 'INPUT') return;

  const currentPart = currentFocus?.classList[0];
  const currentIndex = orderArray.findIndex((single) => single === currentPart);

  if(currentIndex < inputElements.length - 1) {

    const newFocus = inputElements[currentIndex + 1];

    newFocus.value?.focus();

  }

}

/**
 * set the new date if the length requirements are matched
 * triggers focusNext
 */
function update (type: 'from' | 'to') {

  //only update if changes are coming from input fields
  if(document.activeElement?.nodeName !== 'INPUT' || !datepickerElement.value?.contains(document.activeElement)) return;

  if(type === 'from') {

    if(!tempDayFrom.value || tempDayFrom.value.length < 2 || 
      !tempMonthFrom.value || tempMonthFrom.value.length < 2 || 
      !tempYearFrom.value || tempYearFrom.value.length < 4
    ) return;

    if(props.time) {

      if(!tempHoursFrom.value || tempHoursFrom.value.length < 2 || 
      !tempMinutesFrom.value || tempMinutesFrom.value.length < 2
      ) return;
      
      if(props.seconds) {

        if(!tempSecondsFrom.value || tempSecondsFrom.value.length < 2) return;

      }

    }
  
    tempDateFrom.value = dayjs()
      .set('date', +tempDayFrom.value)
      .set('month', +tempMonthFrom.value - 1)
      .set('year', +tempYearFrom.value)
      .set('hours', +tempHoursFrom.value)
      .set('minutes', +tempMinutesFrom.value)
      .set('seconds', +tempSecondsFrom.value);

    //update the calendar month only if the active element is part of the datepicker and a input
    if(document.activeElement?.nodeName === 'INPUT' && datepickerElement.value?.contains(document.activeElement)) setCalendarMonth(tempDateFrom.value);

  }
 
  if(type === 'to') {

    if(!tempDayTo.value || tempDayTo.value.length < 2 || 
      !tempMonthTo.value || tempMonthTo.value.length < 2 || 
      !tempYearTo.value || tempYearTo.value.length < 4
    ) return;

    if(props.time) {

      if(!tempHoursTo.value || tempHoursTo.value.length < 2 || 
      !tempMinutesTo.value || tempMinutesTo.value.length < 2
      ) return;

      if(props.seconds) {

        if(!tempSecondsTo.value || tempSecondsTo.value.length < 2) return;

      }

    }
  
    tempDateTo.value = dayjs()
      .set('date', +tempDayTo.value)
      .set('month', +tempMonthTo.value - 1)
      .set('year', +tempYearTo.value)
      .set('hours', +tempHoursTo.value)
      .set('minutes', +tempMinutesTo.value)
      .set('seconds', +tempSecondsTo.value);

  }

  focusNext();
  updateUseFromTo();
  emitDate(type);
  
}

/**
 * update the base date for calendar rendering with the given date.
 * only updates the rendering of the calendar when its not visible
 */
function setCalendarMonth (date: dayjs.Dayjs) {

  useMonthForCalender.value = date;

  if(!renderCalendar.value) updateMonth();

}

/**
 * updates only the month from the base date for rendering and sets mode to days
 */
function selectCalendarMonth (date: dayjs.Dayjs) {

  useMonthForCalender.value = useMonthForCalender.value.set('year', date.get('year')).set('month', date.get('month'));

  mode.value = 'days';
  updateMonth();

}

/**
 * updates only the month from the base date for rendering and sets mode to days
 */
function selectCalendarYear (date: dayjs.Dayjs) {

  useMonthForCalender.value = useMonthForCalender.value.set('year', date.get('year'));

  mode.value = 'month';
  updateMonth();

}

function modifyCalendarMonth (direction: 'prev' | 'next', amount?: number) {

  let useAmount = amount || 1;
  let type = 'month';

  if(mode.value === 'month') {

    // useAmount = 1;
    type = 'year';

  }

  if(mode.value === 'years') {

    useAmount = useAmount * 9;
    type = 'year';

  }

  if(direction === 'prev') {

    useMonthForCalender.value = useMonthForCalender.value.subtract(useAmount, type);

  }

  if(direction === 'next') {

    useMonthForCalender.value = useMonthForCalender.value.add(useAmount, type);

  }

  updateMonth();

}

/**
 * This function updates the values of useFrom and useTo based on the hoverDate.
 * Depending on the position of the hoverDate relative to tempDateFrom and tempDateTo,
 * it determines the appropriate range for useFrom and useTo.
 */
function updateUseFromTo () {

  if(!props.range) {

    useFrom.value = tempDateFrom.value;
    return;

  }

  if(staticMode.value) {

    selectMode.value = staticMode.value;

    if(selectMode.value === 'to') {

      useTo.value = hoverDate.value;
      useFrom.value = tempDateFrom.value;

    } else if(selectMode.value === 'from') {

      useTo.value = tempDateTo.value;
      useFrom.value = hoverDate.value;

    }

    return;

  }

  // Check if hoverDate is defined and is between tempDateFrom and tempDateTo (inclusive)
  if (hoverDate.value && hoverDate.value?.isBetween(tempDateFrom.value, tempDateTo.value, 'date')) {

    selectMode.value = 'to';
    useTo.value = hoverDate.value;
    useFrom.value = tempDateFrom.value;

  // Check if hoverDate is defined and is after tempDateTo
  } else if (hoverDate.value && hoverDate.value?.isAfter(tempDateTo.value, 'date')) {

    selectMode.value = 'to';
    useTo.value = hoverDate.value;
    useFrom.value = tempDateFrom.value;

  // Check if hoverDate is defined and is before tempDateFrom
  } else if (hoverDate.value && hoverDate.value?.isBefore(tempDateFrom.value, 'date')) {

    selectMode.value = 'from';
    useTo.value = tempDateTo.value;
    useFrom.value = hoverDate.value;

  // If none of the above conditions are met
  } else {

    useTo.value = tempDateTo.value;
    useFrom.value = tempDateFrom.value;

  }
}

function getCalendarElements (date: dayjs.Dayjs) {

  const elementsToDisplay = monthVisibleMediaAware.value;
  const elements: DatepickerCalendarElement[] = [];
  const days = (elementsToAdd = 0) => {

    const baseDate = date.set('date', 15).add(elementsToAdd, 'month').startOf('month').startOf('week');
    const targetElement: DatepickerCalendarElement = {
      days : [], 
      month: date.set('date', 15).add(elementsToAdd, 'month')
    }

    for (let day = 0; day < 42; day++) {
  
      const currentWorkDate = baseDate.add(day, 'day');
      const addElement: DatepickerCalendarDay = {
        day           : currentWorkDate, 
        isToday       : currentWorkDate.isSame(dayjs(), 'day'),
        isCurrentMonth: currentWorkDate.isSame(targetElement.month, 'month'),
        isFrom        : currentWorkDate.isSame(useFrom.value, 'date'),
        isTo          : currentWorkDate.isSame(useTo.value, 'date') && props.range,
        inRange       : currentWorkDate.isBetween(useFrom.value, useTo.value, 'date') && props.range,
      };

      if(!checkAfter(currentWorkDate) && !addElement.isFrom && !addElement.isTo) addElement.isBefore = true;
      if(!checkBefore(currentWorkDate) && !addElement.isFrom && !addElement.isTo) addElement.isAfter = true;

      targetElement.days?.push(addElement);

    }

    elements.push(targetElement);

  }
  const month = (elementsToAdd = 0) => {

    const baseDate = date.clone().startOf('year').add(elementsToAdd, 'year');
    const targetElement: DatepickerCalendarElement = {
      year  : baseDate,
      months: []
    }

    for (let count = 0; count < 12; count++) {
      
      targetElement.months?.push(baseDate.add(count, 'month'));

    }

    elements.push(targetElement);
  
  };
  const years = (elementsToAdd = 0) => {

    //multiply with 9 to match the amount of years
    const baseDate = date.clone().startOf('year').add(elementsToAdd * 9, 'year');
    const targetElement: DatepickerCalendarElement = {
      year : baseDate,
      from : baseDate.subtract(4, 'year'),
      to   : baseDate.add(4, 'year'),
      years: []
    }
      
    targetElement.years?.push(baseDate.subtract(4, 'year'));
    targetElement.years?.push(baseDate.subtract(3, 'year'));
    targetElement.years?.push(baseDate.subtract(2, 'year'));
    targetElement.years?.push(baseDate.subtract(1, 'year'));
    targetElement.years?.push(baseDate);

    targetElement.years?.push(baseDate.add(1, 'year'));
    targetElement.years?.push(baseDate.add(2, 'year'));
    targetElement.years?.push(baseDate.add(3, 'year'));
    targetElement.years?.push(baseDate.add(4, 'year'));

    elements.push(targetElement);
  
  };
  const functions = {
    days,
    month,
    years
  }

  // Add months based on the number of months to display
  if (elementsToDisplay === 1) {

    functions[mode.value]()

  } else if (elementsToDisplay === 2) {

    functions[mode.value]()
    functions[mode.value](1)

  } else if (elementsToDisplay === 3) {

    functions[mode.value](-1)
    functions[mode.value]()
    functions[mode.value](1)

  } else if (elementsToDisplay === 6) {

    functions[mode.value](-1)
    functions[mode.value]()
    functions[mode.value](1)
    functions[mode.value](2)
    functions[mode.value](3)
    functions[mode.value](4)

  }

  return elements;
}

function updateMonth () {

  const elements = getCalendarElements(useMonthForCalender.value);

  calendarElements.value = elements

}

function checkAfter (date: dayjs.Dayjs) {

  if(!props.after && !props.future) return true;

  const afterDate = dayjs(props.after);

  return props.time 
    ? date.isAfter(afterDate)
    : date.startOf('date').isAfter(afterDate, 'date')

}

function checkBefore (date: dayjs.Dayjs) {

  if(!props.before && !props.past) return true;

  const beforeDate = dayjs(props.before);

  return props.time 
    ? date.isBefore(beforeDate)
    : date.subtract(1, 'day').startOf('date').isBefore(beforeDate)

}

function selectDate (singleDay: {day: dayjs.Dayjs}, target: 'from' | 'to' = 'from') {

  if(!props.range) {

    if(checkAfter(singleDay.day) && checkBefore(singleDay.day)) {

      setTemp(singleDay.day, 'from', false);
      if(!props.stayOpenOnSelect) toggleCalendar(false);

    } 

    return;

  }

  if(!staticMode.value) {

    if(singleDay.day?.isSame(tempDateFrom.value, 'date')) {

      staticMode.value = 'from';
      return;

    }

    if(singleDay.day?.isSame(useTo.value, 'date')) {

      staticMode.value = 'to';
      return;

    }

    return;

  }

  if(target === 'from') {

    if(singleDay.day.isAfter(tempDateTo.value)) {

      if(checkAfter(singleDay.day) && checkBefore(singleDay.day)) {

        staticMode.value = undefined;
        setTemp(tempDateTo.value, 'from', false);
        setTemp(singleDay.day, 'to', false);
        return;

      }

    }

  }

  if(target === 'to') {

    if(singleDay.day.isBefore(tempDateFrom.value)) {

      if(checkAfter(singleDay.day) && checkBefore(singleDay.day)) {

        staticMode.value = undefined;
        setTemp(tempDateFrom.value, 'to', false);
        setTemp(singleDay.day, 'from', false);
        return;
        
      }

    } 
    
  }
    
  if(checkAfter(singleDay.day) && checkBefore(singleDay.day)) {

    setTemp(singleDay.day, target, false);
    staticMode.value = undefined;

  }

}

function selectTime (number: number, type: 'hours' | 'minutes' | 'seconds', target: 'from' | 'to') {

  const newDate = target === 'from' ? tempDateFrom.value?.clone() : tempDateTo.value?.clone();
  let tempCompareDate = newDate as dayjs.Dayjs;

  tempCompareDate = tempCompareDate.set(type, number);
  if(!checkAfter(tempCompareDate) || !checkBefore(tempCompareDate)) return false;
  
  if(target === 'from') {

    if(props.range && tempCompareDate.isAfter(tempDateTo.value)) {

      return false;

    }

    if(type === 'hours') tempHoursFrom.value = number.toString().padStart(2, '0');
    if(type === 'minutes') tempMinutesFrom.value = number.toString().padStart(2, '0');
    if(type === 'seconds') tempSecondsFrom.value = number.toString().padStart(2, '0');

    tempDateFrom.value = tempDateFrom.value?.clone()
      .set('hours', +tempHoursFrom.value)
      .set('minutes', +tempMinutesFrom.value)
      .set('seconds', +tempSecondsFrom.value);

  }

  if(target === 'to') {

    if(props.range && tempCompareDate.isBefore(tempDateFrom.value)) {

      return false;

    }

    if(type === 'hours') tempHoursTo.value = number.toString().padStart(2, '0');
    if(type === 'minutes') tempMinutesTo.value = number.toString().padStart(2, '0');
    if(type === 'seconds') tempSecondsTo.value = number.toString().padStart(2, '0');

    tempDateTo.value = tempDateTo.value?.clone()
      .set('hours', +tempHoursTo.value)
      .set('minutes', +tempMinutesTo.value)
      .set('seconds', +tempSecondsTo.value);

  }

  return true;

}

function updateHover (day?: dayjs.Dayjs) {

  if(!staticMode.value) return;

  hoverDate.value = day;
  updateUseFromTo();
  updateMonth();

}

function toggleMode () {

  if(mode.value === 'years') {
    mode.value = 'days'
  } else if(mode.value === 'days') {
    mode.value = 'month';
  } else if(mode.value === 'month') { 
    mode.value = 'years'
  }

  updateMonth();
  
}

function setTime (target: 'from' | 'to') {

  const useTempDate = target === 'from' 
    ? tempDateFrom 
    : tempDateTo;

  if(!useTempDate) return;

  scrollToIndex(+(useTempDate.value?.get('hours') || 0), 'hours');
  scrollToIndex(+(useTempDate.value?.get('minutes') || 0), 'minutes');
  scrollToIndex(+(useTempDate.value?.get('seconds') || 0), 'seconds');

}

/**
 * scroll to a specific element
 */
function scrollToIndex (index: number, target: 'hours' | 'minutes' | 'seconds', animate = false) {

  const targetElement = timeScrollElements.value[target];

  if(!targetElement) return;

  targetElement?.scrollTo({top: index * timeElementHeight.value, behavior: animate ? 'smooth' : 'instant'});

}

function handleScroll (event: UIEvent) {

  clearTimeout(scrollTimout.value);
  scrollTimout.value = setTimeout(() => triggerScroll(event), 250);

}

/**
 * Triggers the scroll event and selects the appropriate time based on the scroll position.
 */
function triggerScroll (event: UIEvent) {

  const target = event.target as HTMLElement;
  const childContainer = target.childNodes[0] as HTMLElement;
  // Extract the time unit type (seconds, hours, or minutes) from the class name of the child container
  const type = childContainer.classList[0].split('-')[0] as 'seconds' | 'hours' | 'minutes';
  // Get the current scroll position of the target element
  const scrollTop: number = target.scrollTop;
  // Calculate the selected number based on the scroll position
  // Assuming each time unit is 100 pixels tall
  const selectedNumber: number = Math.round(scrollTop / timeElementHeight.value);

  // Select the time based on the calculated number and the extracted time unit type
  if(!selectTime(selectedNumber, type, timeTarget.value)) {

    const useDate = timeTarget.value === 'from' ? tempDateFrom.value : tempDateTo.value;

    scrollToIndex(useDate?.get(type) as number, type, true);

  }
}

/**
 * Sets the predefined time by selecting and scrolling to the specified hours, minutes, and seconds.
 * If the 'now' parameter is true, it sets the time to the current time.
 */
function setPredefinedTime (hours?: number, minutes?: number, seconds?: number, now?: true) {

  // Check if hours is defined, if so, select and scroll to the specified hour
  if (hours !== undefined) {

    if(selectTime(hours, 'hours', timeTarget.value)) {

      scrollToIndex(hours, 'hours', true);

    }

  }
  
  // Check if minutes is defined, if so, select and scroll to the specified minute
  if (minutes !== undefined) {

    if(selectTime(minutes, 'minutes', timeTarget.value)) {

      scrollToIndex(minutes, 'minutes', true);
    }

  }
  
  // Check if seconds is defined, if so, select and scroll to the specified second
  if (seconds !== undefined) {

    if(selectTime(seconds, 'seconds', timeTarget.value)) {

      scrollToIndex(seconds, 'seconds', true);

    }

  }
  
  // If 'now' is true, set the time to the current time
  if (now) {

    if(selectTime(dayjs().get('hours'), 'hours', timeTarget.value)) scrollToIndex(dayjs().get('hours'), 'hours', true);
    if(selectTime(dayjs().get('minutes'), 'minutes', timeTarget.value)) scrollToIndex(dayjs().get('minutes'), 'minutes', true);
    if(selectTime(dayjs().get('seconds'), 'seconds', timeTarget.value)) scrollToIndex(dayjs().get('seconds'), 'seconds', true);

  }
}

</script>
<template>
    <section class="datepicker-partial" ref="datepickerElement" :class="[`monthVisible${monthVisibleMediaAware}`, {range, icon, time, seconds}]" :style="monthVisibleCss">
        <section class="input-container" ref="triggerElement">

          <lila-button-partial v-if="icon" @click="toggleCalendar()" class="front-toggle-icon" color-scheme="transparent"><lila-icons-partial size="small" :type="icon" /></lila-button-partial>

            <section class="input-group from">
              <input @keydown="checkInput('date', $event)" class="dayFrom" ref="dayFrom" @focus="focus" @blur="blur" v-model="tempDayFrom"  />
              <span class="delimiter">.</span>
              <input @keydown="checkInput('month', $event)" class="monthFrom" ref="monthFrom" @focus="focus" @blur="blur" v-model="tempMonthFrom" />
              <span class="delimiter">.</span>
              <input @keydown="checkInput('year', $event)" class="yearFrom" ref="yearFrom" @focus="focus" @blur="blur" v-model="tempYearFrom" />
              <template v-if="time">
                <lila-button-partial color-scheme="icon" @click="toggleCalendar"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
                <input @keydown="checkInput('hours', $event)" class="hoursFrom" ref="hoursFrom" @focus="focus" @blur="blur" v-model="tempHoursFrom"  />
                <span class="delimiter">:</span>
                <input @keydown="checkInput('minutes', $event)" class="minutesFrom" ref="minutesFrom" @focus="focus" @blur="blur" v-model="tempMinutesFrom" />
                <template v-if="seconds">
                  <span class="delimiter">:</span>
                  <input @keydown="checkInput('seconds', $event)" class="secondsFrom" ref="secondsFrom" @focus="focus" @blur="blur" v-model="tempSecondsFrom" />
                </template>
                <lila-button-partial color-scheme="icon" @click="toggleCalendar(undefined, 'time', 'from')"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
              </template>
            </section>

            <template v-if="range">

              <lila-icons-partial class="range-separator-icon" size="medium" type="arrow-right-long" />
              
              <section class="input-group to">
                <input @keydown="checkInput('date', $event, 'to')" class="dayTo" ref="dayTo" @focus="focus" @blur="blur" v-model="tempDayTo"  />
                <span class="delimiter">.</span>
                <input @keydown="checkInput('month', $event, 'to')" class="monthTo" ref="monthTo" @focus="focus" @blur="blur" v-model="tempMonthTo" />
                <span class="delimiter">.</span>
                <input @keydown="checkInput('year', $event, 'to')" class="yearTo" ref="yearTo" @focus="focus" @blur="blur" v-model="tempYearTo" />
                <template v-if="time">
                  <lila-button-partial color-scheme="icon" @click="toggleCalendar"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
                  <input @keydown="checkInput('hours', $event, 'to')" class="hoursTo" ref="hoursTo" @focus="focus" @blur="blur" v-model="tempHoursTo"  />
                  <span class="delimiter">:</span>
                  <input @keydown="checkInput('minutes', $event, 'to')" class="minutesTo" ref="minutesTo" @focus="focus" @blur="blur" v-model="tempMinutesTo" />
                  <template v-if="seconds">
                    <span class="delimiter">:</span>
                    <input @keydown="checkInput('seconds', $event, 'to')" class="secondsTo" ref="secondsTo" @focus="focus" @blur="blur" v-model="tempSecondsTo" />
                  </template>
                  <lila-button-partial color-scheme="icon" @click="toggleCalendar(undefined, 'time', 'to')"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
                </template>
        
              </section>

            </template>

            <lila-button-partial v-if="!time" color-scheme="icon" @click="toggleCalendar"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
        </section>

        <lila-overlay-background-partial v-if="renderCalendar" background="none" ref="options" @mounted="calculateOptionsStyle" @close="toggleCalendar(false)">
          <article class="calendar-container time" v-if="calendarMode === 'time'" ref="calendarContainer" :style="calculatedOptions">
            <header class="main">
                <section class="controls">
                  <lila-button-group-partial>
                    <lila-button-partial @click="toggleCalendar()" color-scheme="transparent"><lila-icons-partial size="small" type="chevron-up" /></lila-button-partial>
                  </lila-button-group-partial>
                </section>
              </header>
            <section class="time-selector-container" :class="{seconds}">
              <div class="scroll-overlay-gradient top"></div>
              <section class="scroll-container" ref="hoursScroll" @scroll="handleScroll($event as UIEvent)">
                <section class="hours-container">
                  <div class="scroll-space"></div>
                  <button @click="setPredefinedTime(0, undefined, undefined)">00</button>
                  <button v-for="number in 23" @click="setPredefinedTime(number, undefined, undefined)" :key="`hours-${number}`">
                    {{ number.toString().padStart(2, '0') }}
                  </button>
                  <div class="scroll-space"></div>
                </section>
              </section>
              <section class="scroll-container" ref="minutesScroll" @scroll="handleScroll($event as UIEvent)">
                <section class="minutes-container">
                  <div class="scroll-space"></div>
                  <button @click="setPredefinedTime(undefined, 0, undefined)">00</button>
                  <button v-for="number in 59" @click="setPredefinedTime(undefined, number, undefined)" :key="`minutes-${number}`">
                    {{ number.toString().padStart(2, '0') }}
                  </button>
                  <div class="scroll-space"></div>
                </section>
              </section>
              <section v-if="seconds" class="scroll-container" ref="secondsScroll" @scroll="handleScroll($event as UIEvent)">
                <section class="seconds-container">
                  <div class="scroll-space"></div>
                  <button @click="setPredefinedTime(undefined, undefined, 0)">00</button>
                  <button v-for="number in 59" @click="setPredefinedTime(undefined, undefined, number)" :key="`seconds-${number}`">
                    {{ number.toString().padStart(2, '0') }}
                  </button>
                  <div class="scroll-space"></div>
                </section>
              </section>
              <div class="scroll-overlay-gradient bottom"></div>
            </section>
            <section class="time-selector-predefined-container">
              <section class="border-container">
                <section class="time-predefined-group">
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(0)">00:00</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(9)">09:00</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(12)">12:00</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(15)">15:00</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(18)">18:00</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(20)">20:00</lila-button-partial>
                </section>
                
                <section class="time-predefined-group">
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(undefined, 0)">00:00</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(undefined, 15)">00:15</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(undefined, 30)">00:30</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(undefined, 45)">00:45</lila-button-partial>
                  <lila-button-partial color-scheme="colorScheme2" @click="setPredefinedTime(undefined, undefined, undefined, true)">{{$translate('datepicker-predefined-now')}}</lila-button-partial>
                </section>
                
              </section>
            </section>
            <footer class="main">
              <lila-button-partial @click="toggleCalendar()" color-scheme="colorScheme1">{{ $translate('datepicker-select-time-button') }}</lila-button-partial>
            </footer>
          </article>

          <article class="calendar-container" v-if="calendarMode === 'date'" 
            ref="calendarContainer" :key="$helpers.date(useMonthForCalender, 'MMYYYY')" :class="[`monthVisible${monthVisibleMediaAware}`, {range, icon}]" :style="calculatedOptions">
              <header class="main">
                <section class="details">
                  <h3 v-if="range">
                    {{ $translateWithDiff('datepicker-range-days', rangeDuration) }}
                  </h3>
                </section>
                <section class="controls">
                  <lila-button-group-partial>
                    <lila-button-partial @click="toggleCalendar()" color-scheme="transparent"><lila-icons-partial size="small" type="chevron-up" /></lila-button-partial>
                    <lila-button-partial @click="modifyCalendarMonth('prev', monthVisibleMediaAware)" color-scheme="transparent"><lila-icons-partial size="small" type="chevron-left" /></lila-button-partial>
                    <lila-button-partial @click="modifyCalendarMonth('next', monthVisibleMediaAware)" color-scheme="transparent"><lila-icons-partial size="small" type="chevron-right" /></lila-button-partial>
                  </lila-button-group-partial>
                </section>
              </header>
              <section class="scroll-container">

                <section class="elements-container">
                  <article class="single-element" v-for="(singleElement, index) in calendarElements" :key="`month-${index}`">
  
                    <template v-if="mode ==='days'">
  
                      <h3 class="selectTitle" role="button" @click="toggleMode">{{ $helpers.date(singleElement.month, 'MMMM') }} {{ $helpers.date(singleElement.month, 'YYYY') }}</h3>
                      <header>
                        <section class="header-day">MO</section>
                        <section class="header-day">DI</section>
                        <section class="header-day">MI</section>
                        <section class="header-day">DO</section>
                        <section class="header-day">FR</section>
                        <section class="header-day">SA</section>
                        <section class="header-day">SO</section>
                      </header>
                      <section class="days-container">
                        <template v-for="(singleDay, dayIndex) in singleElement.days" :key="`day-${dayIndex}`">
    
                          <div v-if="singleDay.isCurrentMonth && !singleDay.isAfter && !singleDay.isBefore" role="button" class="day active" 
                            :class="{
                                currentMonth: singleDay.isCurrentMonth, 
                                today: singleDay.isToday, 
                                isSelected: singleDay.isSelected, 
                                isFrom: singleDay.isFrom, 
                                isTo: singleDay.isTo,
                                inRange: singleDay.inRange,
                                isHover: singleDay.isHover,
                                isBefore: singleDay.isBefore,
                                isAfter: singleDay.isAfter
                              }" 
                              @mouseenter="updateHover(singleDay.day)" 
                              @mouseleave="updateHover()" 
                              @click="selectDate(singleDay, selectMode)"
                            >
                            {{ $helpers.date(singleDay.day, 'D') }}
                          </div>
                          <div v-if="!singleDay.isCurrentMonth || singleDay.isAfter || singleDay.isBefore" class="day">
                            {{ $helpers.date(singleDay.day, 'D') }}
                          </div>
    
                        </template>
                      </section>
                      
                    </template>
  
                    <template v-if="mode ==='month'">
  
                      <h3 class="selectTitle" role="button" @click="toggleMode">{{ $helpers.date(singleElement.year, 'YYYY') }}</h3>
                      <article class="selection-container">
                        <section role="button" class="single-month" v-for="(singleMonth, index) in singleElement.months" :key="`month-${index}`" @click="selectCalendarMonth(singleMonth)">
                          {{ $helpers.date(singleMonth, 'MMMM') }}
                        </section>
                      </article>
  
                    </template>
  
                    <template v-if="mode ==='years'">
  
                      <h3 class="selectTitle" role="button" @click="toggleMode">{{ $helpers.date(singleElement.from, 'YYYY') }} - {{ $helpers.date(singleElement.to, 'YYYY') }}</h3>
                      <article class="selection-container">
                        <section role="button" class="single-year" v-for="(singleYear, index) in singleElement.years" :key="`month-${index}`" @click="selectCalendarYear(singleYear)">
                          {{ $helpers.date(singleYear, 'YYYY') }}
                        </section>
                      </article>
  
                    </template>
  
                  </article>
                </section>

              </section>

              <footer class="main">
                <lila-button-partial @click="toggleCalendar()" color-scheme="colorScheme1">{{ $translate('datepicker-select-button') }}</lila-button-partial>
              </footer>

          </article>
      </lila-overlay-background-partial>

    </section>
</template>
<style lang="less" scoped>
.datepicker-partial {
    display: grid;
    grid-template-columns: max-content;

    .input-container {
      display: grid;
      border-bottom: 1px @color1 solid;
      grid-template-columns: 1fr max-content;

      .input-group {

        display: grid;
        grid-template-columns: 17px max-content 17px max-content 35px;
        overflow: hidden;
        align-content: center;
        align-items: center;

        .delimiter {
          display: grid;
          line-height: 20px;
          width: 7px;
          text-align: center;
        }

        input {
          outline: none;
          border: 0;
          padding: 5px 0;
          text-align: center;
        }
      }
        
    }

    &.icon {
      :deep(.front-toggle-icon) {
        width: 25px;
        .lila-icons-partial {
          width: 20px;

        }
      }

      .input-container {
        grid-template-columns: 25px 1fr max-content;
      }
    }

    &.range {

      .input-container {
        grid-template-columns: max-content 35px max-content max-content;
        
        .range-separator-icon {
          justify-self: center;
        }
        
      }

      &.icon {

        .input-container {
          grid-template-columns: 25px max-content 35px max-content max-content;
        }

      }

      &.time {

        .input-container {
            grid-template-rows: max-content max-content;
            justify-items: start;
            .input-group.to {
              grid-row-start: 2;
            }

        }

      }

      &.icon.time {
        .input-container {
          grid-template-columns: 25px max-content;

          .range-separator-icon, .input-group.to {
            grid-row-start: 2;
          }
          .range-separator-icon {
            grid-column-start: 1;
          }
        }
      }

    }

    &.time {
      /* stylelint-disable-next-line no-descending-specificity */
      .input-container {
        .input-group {
          grid-template-columns: 17px max-content 17px max-content 35px 35px 17px max-content 17px 35px;
        }

      }

      &.seconds {
        /* stylelint-disable-next-line no-descending-specificity */
        .input-container {
          .input-group {
            grid-template-columns: 17px max-content 17px max-content 35px 35px 17px max-content 17px max-content 17px 35px;
          }

        }

      }

    }
}

.calendar-container {
  display: grid;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background-color: @white;
  grid-template-rows: 40px calc(100vh - 120px) 80px;

  header.main {

    display: grid;
    grid-template-columns: 1fr 1fr;

    background-color: @grey1;

    .details {
      h3 {
        .multi(padding, 0, 2);
        line-height: @buttonHeight;
        font-size: @fontText;
      }

    }
  }

  footer.main {

    display: grid;
    align-items: center;
    justify-items: center;

    @media @desktop {
      display: none;
    }

  }

  .scroll-container {
    overflow-y: auto;
  }

  @media @desktop {
    width: calc(var(--monthVisible) * 350px);
    grid-template-rows: 40px 1fr;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.13);
    border: solid 1px @grey1;
    position: absolute;

    &.time {
      width: 450px;
      grid-template-rows: 1fr max-content;
      grid-template-columns: 2fr 1fr;
    }

  }

  &.time {
    box-shadow: none;
    border: 0;
    grid-template-rows: 35px max-content 1fr 80px;
    height: 100vh;
    
    @media @desktop {
      align-items: end;
      grid-template-rows: 1fr;
      height: auto;
    }

    header.main {
      display: grid;
      grid-template-columns: 1fr;

      @media @desktop {
        display: none;
      }

    }

  }

  h3.selectTitle {
    display: grid;
    height: 60px;
    width: 100%;

    align-content: center;
    justify-content: center;

    &[role=button] {

      .trans(color);
      cursor: pointer;

      &:hover {
        color: @color1;
      }

      user-select: none;

    }

  }

  .selection-container {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;

    .single-month,
    .single-year {
      display: grid;
      justify-content: center;
      align-content: center;
      cursor: pointer;

      .multi(padding, 4);

      &:hover {
        background-color: @color1;
        color: @white;
      }
    }

  }

  .elements-container {
    display: grid;

    transition: opacity .5s, transform .5s;

    @media @desktop {
      grid-template-rows: 365px;
    }

    .single-element {
      display: grid;
      justify-items: center;

      grid-template-rows: 60px 1fr;
      max-width: 450px;
      width: 100%;
      align-self: center;
      justify-self: center;

      .multi(padding, 0, 2);

      @media @desktop {
        align-self: auto;
        justify-self: auto;

        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6) {
          border-top: solid 1px @grey;
        }

        &:nth-child(2),
        &:nth-child(5) {
          border-left: solid 1px @grey;
          border-right: solid 1px @grey;
        }

      }

      header,
      .days-container {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;

        width: 100%;

        .day {
          color: @grey;
          width: 1fr;
          aspect-ratio: 1/1;

          border: solid 1px @white;

          justify-content: center;
          align-content: center;
          cursor: pointer;
          pointer-events: none;

          &.currentMonth {
            color: @textColor;
          }

          &.today {
            color: @color1;
            .font-head;
          }

          &.isSelected,
          &.isTo,
          &.isFrom {
            background-color: @color3;
            color: @white;
          }

          &.inRange {
            background-color: @color2;
          }

          &.isHover {
            background-color: @black;
          }

          &.active {

            pointer-events: all;

            &:hover {
              background-color: @color1;
              color: @white;
            }
          }

        }
      }

      .days-container {
        .day {

          &:nth-child(7n),
          &:nth-child(7n -1) {
            .font-bold;
          }
        }
      }

      header {
        .header-day {

          &:nth-child(7n),
          &:nth-child(7n -1) {
            .font-bold;
          }
        }
      }

    }

  }

  .time-selector-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.13);
    border: solid 1px @grey1;
    
    &.seconds {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .scroll-overlay-gradient {
        position: absolute;
        height: calc(var(--elementHeight) * 1);
        width: 100%;
        pointer-events: none;

        justify-self: start;
        align-self: start;

        background: linear-gradient(
          to bottom,
          rgba(255,255,255,.9) 0%,
          rgba(255,255,255,.7) 100%
        );

        &.bottom {
          justify-self: end;
          align-self: end;

          background: linear-gradient(
          to top,
          rgba(255,255,255,.9) 0%,
          rgba(255,255,255,.7) 100%
        );

        }
      }

    .scroll-container {
      height: calc(var(--elementHeight) * 3);
      scroll-snap-type: y mandatory;
      background-color: @white;

      &::-webkit-scrollbar {
        display: none;
      }
      
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      button, .scroll-space {
        scroll-snap-align: start;
        display: grid;
        height: var(--elementHeight);
        align-content: center;
        justify-content: center;
      }

      button {
        background-color: @grey2;
        border: 0;
        font-size: @headline_XS;
        color: @color1;
        .font-head;
      }

    }

    .hours-container {
      display: grid;
      grid-template-rows: repeat(24, var(--elementHeight));
    }

    .minutes-container, .seconds-container {
      display: grid;
      grid-template-rows: repeat(60, var(--elementHeight));

    }

  }

  .time-selector-predefined-container {
      display: grid;
      grid-auto-rows: max-content;

      .border-container {
        display: grid;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.13);
        border: solid 1px @grey1;
        grid-template-columns: 1fr 1fr;
        background-color: @grey1;
      }

      .time-predefined-group {

        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: max-content;

        &.select-button {

          grid-column-start: 1;
          grid-column-end: 3;

        }

        .title {
          display: grid;

          grid-column-start: 1;
          grid-column-end: 2;

          .multi(padding, 2);

          text-align: center;
          font-size: @fontTextSmaller;
        }

      }

  }

  &.monthVisible1 {

    .elements-container {
      display: grid;
      grid-template-columns: 1fr;
    }
  }

  &.monthVisible2 {
    .elements-container {
      display: grid;

      @media @desktop {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  &.monthVisible3 {
    .elements-container {
      display: grid;

      @media @desktop {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  &.monthVisible6 {

    @media @desktop {
      width: calc(3 * 350px);
    }

    .elements-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      @media @desktop {
        grid-template-rows: 365px 365px;
      }
    }
  }
}
</style>