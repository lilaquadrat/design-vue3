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
}>();
const { media, resized } = useResize();
/**
 * working dates from
 */
const tempDayFrom = ref<string>('00');
const tempMonthFrom = ref<string>('00');
const tempYearFrom = ref<string>('0000');
const tempDateFrom = ref<dayjs.Dayjs>();
/**
 * working dates to
 */
const tempDayTo = ref<string>('00');
const tempMonthTo = ref<string>('00');
const tempYearTo = ref<string>('0000');
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
const dayFrom = ref<HTMLInputElement>();
const monthFrom = ref<HTMLInputElement>();
const yearFrom = ref<HTMLInputElement>();
/**
 * references to the input elements for to
 */
const dayTo = ref<HTMLInputElement>();
const monthTo = ref<HTMLInputElement>();
const yearTo = ref<HTMLInputElement>();
/**
 * array of all input references for focus the next input element
 */
const inputElements = [dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo];
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

onBeforeMount(() => {
  
  setTemp(props.from);
  setTemp(props.to, 'to');
  setmonthVisibleMediaAware();

});
watch(() => fromModel.value, () => setTemp(fromModel.value)); 
watch(() => toModel.value, () => setTemp(toModel.value, 'to')); 
watch(() => [tempDayFrom.value, tempMonthFrom.value, tempYearFrom.value], () => update('from')); 
watch(() => [tempDayTo.value, tempMonthTo.value, tempYearTo.value], () => update('to')); 
watch(() => [resized.value, media.value], () => {

  calculateOptionsStyle();
  setmonthVisibleMediaAware();

});

const monthVisibleCss = computed(() => ({'--monthVisible': props.monthVisible || 1}));
const rangeDuration = computed(() => {

  const range = useTo.value?.endOf('day').diff(useFrom.value?.startOf('day'), 'day');

  return !range ? 0 : range < 0 ? -range : range;

});

function setmonthVisibleMediaAware () {

  monthVisibleMediaAware.value = props.monthVisible || 1;
  if(props.monthVisible === 6 && (media.value === 'mobile' || media.value === 'tablet')) monthVisibleMediaAware.value = 3;

  updateMonth();

}

function setTemp (baseDate?: Date | string | dayjs.Dayjs, target: 'from' | 'to' = 'from', updateCalendarMonth: boolean = true) {

  const date = baseDate ? dayjs(baseDate).clone() : dayjs();

  if(target === 'from') {
    
    tempDayFrom.value = date.get('date').toString().padStart(2, '0');
    tempMonthFrom.value = (date.get('month') + 1).toString().padStart(2, '0');
    tempYearFrom.value = date.get('year').toString();
  
    tempDateFrom.value = date;

  }

  if(target === 'to') {

    tempDayTo.value = date.get('date').toString().padStart(2, '0');
    tempMonthTo.value = (date.get('month') + 1).toString().padStart(2, '0');
    tempYearTo.value = date.get('year').toString();
    
    tempDateTo.value = date;

  }

  if(updateCalendarMonth && !!tempDateFrom.value) setCalendarMonth(tempDateFrom.value);
  updateUseFromTo();
  if(!props.range) updateMonth();
  
}

function emitDate (target: 'from' | 'to' = 'from') {
  
  if(target === 'from') fromModel.value = tempDateFrom.value?.toDate();
  if(target === 'to') toModel.value = tempDateTo.value?.toDate();

}

function checkInput (type: 'date' | 'month' | 'year', input: KeyboardEvent, target: 'from' | 'to' = 'from') {
  
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
  if(type === 'date' || type === 'month') {

    if(tempValue.length > 2) {

      input.preventDefault();
      return;

    }

    console.log(tempValue.length, tempValue);

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

  if(!tempCompareDate) return;

  if(props.range) {

    if(target === 'from') {

      if(tempCompareDate.isAfter(tempDateTo.value, 'date')) {

        console.log('is after');
        input.preventDefault();
        return;

      }

    }

    if(target === 'to') {

      if(tempCompareDate.isBefore(tempDateFrom.value, 'date')) {

        input.preventDefault();
        return;

      }

    }

  }

  if(props.after || props.future) {

    const afterDate = dayjs(props.after);

    if(tempCompareDate.startOf('date').isBefore(afterDate)) {

      console.log('must be after', afterDate);
      input.preventDefault();
      return;
    }

  }

}

function calculateOptionsStyle () {

  const element = triggerElement.value as HTMLElement;
  const calendarContainerElement = calendarContainer.value as HTMLElement;

  calculatedOptions.value = {
    '--monthVisible': monthVisibleMediaAware.value
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

function toggleCalendar (open?: boolean) {

  calculateOptionsStyle();
  
  // reset to days view when opening the calendar
  mode.value = 'days';
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

  const orderArray = ['dayFrom', 'monthFrom', 'yearFrom', 'dayTo', 'monthTo', 'yearTo'];
  const currentFocus = document.activeElement;

  if(currentFocus?.nodeName !== 'INPUT') return;

  const currentPart = currentFocus?.classList[0];
  const currentIndex = orderArray.findIndex((single) => single === currentPart);

  if(currentIndex < (props.range ? 5 : 2)) {

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
  
    tempDateFrom.value = dayjs().set('date', +tempDayFrom.value).set('month', +tempMonthFrom.value - 1).set('year', +tempYearFrom.value);
    //update the calendar month only if the active element is part of the datepicker and a input
    if(document.activeElement?.nodeName === 'INPUT' && datepickerElement.value?.contains(document.activeElement)) setCalendarMonth(tempDateFrom.value);

  }
 
  if(type === 'to') {

    if(!tempDayTo.value || tempDayTo.value.length < 2 || 
      !tempMonthTo.value || tempMonthTo.value.length < 2 || 
      !tempYearTo.value || tempYearTo.value.length < 4
    ) return;
  
    tempDateTo.value = dayjs().set('date', +tempDayTo.value).set('month', +tempMonthTo.value - 1).set('year', +tempYearTo.value);

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

  return date.startOf('date').isAfter(afterDate, 'date')

}

function checkBefore (date: dayjs.Dayjs) {

  if(!props.before && !props.past) return true;

  const beforeDate = dayjs(props.before);

  return date.subtract(1, 'day').startOf('date').isBefore(beforeDate, 'date')

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

</script>
<template>
    <section class="datepicker-partial" ref="datepickerElement" :class="[`monthVisible${monthVisibleMediaAware}`, {range, icon}]" :style="monthVisibleCss">
        <section class="input-container" ref="triggerElement">
            <lila-button-partial v-if="icon" @click="toggleCalendar()" class="front-toggle-icon" color-scheme="transparent"><lila-icons-partial size="small" :type="icon" /></lila-button-partial>

            <section class="input-group from">
              <input @keydown="checkInput('date', $event)" class="dayFrom" ref="dayFrom" @focus="focus" @blur="blur" v-model="tempDayFrom"  />
              <span class="delimiter">.</span>
              <input @keydown="checkInput('month', $event)" class="monthFrom" ref="monthFrom" @focus="focus" @blur="blur" v-model="tempMonthFrom" />
              <span class="delimiter">.</span>
              <input @keydown="checkInput('year', $event)" class="yearFrom" ref="yearFrom" @focus="focus" @blur="blur" v-model="tempYearFrom" />
            </section>

            <template v-if="range">

              <lila-icons-partial class="range-separator-icon" size="medium" type="arrow-right-long" />
              
              <section class="input-group to">
                <input @keydown="checkInput('date', $event, 'to')" class="dayTo" ref="dayTo" @focus="focus" @blur="blur" v-model="tempDayTo"  />
                <span class="delimiter">.</span>
                <input @keydown="checkInput('month', $event, 'to')" class="monthTo" ref="monthTo" @focus="focus" @blur="blur" v-model="tempMonthTo" />
                <span class="delimiter">.</span>
                <input @keydown="checkInput('year', $event, 'to')" class="yearTo" ref="yearTo" @focus="focus" @blur="blur" v-model="tempYearTo" />
              </section>

            </template>

            <lila-button-partial color-scheme="icon" @click="toggleCalendar"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
        </section>

        <lila-overlay-background-partial v-if="renderCalendar" background="none" ref="options" @mounted="calculateOptionsStyle" @close="toggleCalendar(false)">
          <article class="calendar-container" ref="calendarContainer" :key="$helpers.date(useMonthForCalender, 'MMYYYY')" :class="[`monthVisible${monthVisibleMediaAware}`, {range, icon}]" :style="calculatedOptions">
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
        .range-separator-icon {
          justify-self: center;
        }

        grid-template-columns: max-content 35px max-content max-content;

        .input-group {
          grid-template-columns: 17px max-content 17px max-content 35px;
        }

      }

      &.icon {
        .input-container {
          grid-template-columns: 25px max-content 35px max-content max-content;
        }
      }
    }
}
.calendar-container {
  display: grid;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  background-color: @white;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.13);
  border: solid 1px @grey1;
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
    overflow: scroll;
  }

  @media @desktop {
    width: calc(var(--monthVisible) * 350px);
    grid-template-rows: 40px 1fr;
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