<script setup lang="ts">
import type DatepickerCalendarElement from '@/interfaces/DatepickerCalendarElement.interface';
import { hardCopy } from '@lilaquadrat/studio/lib/esm/frontend';
import dayjs from 'dayjs';

dayjs.locale('de');

import { computed, onBeforeMount, ref, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    date: Date | string
    monthVisible?: number
    stayOpenOnSelect?: boolean
}>();
const tempDay = ref<string>('00');
const tempMonth = ref<string>('00');
const tempYear = ref<string>('0000');
const tempDate = ref<dayjs.Dayjs>();
const whitelistedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete', 'Tab'];
const day = ref<HTMLInputElement>();
const month = ref<HTMLInputElement>();
const year = ref<HTMLInputElement>();
const inputElements = [day, month, year];
const calendarElements = ref<any>({});
const useMonthForCalender = ref();
const calculatedOptions = ref();
const triggerElement = ref<HTMLElement>();
const renderCalendar = ref<boolean>(false);
const mode = ref<'days' | 'month' | 'years'>('days');

onBeforeMount(() => setTemp(props.date));
watch(() => props.date, () => setTemp(props.date)); 
watch(() => [tempDay.value, tempMonth.value, tempYear.value], () => update()); 

const monthVisibleCss = computed(() => ({'--monthVisible': props.monthVisible || 1})); 

function setTemp (baseDate: Date | string | dayjs.Dayjs) {

  const date = dayjs(hardCopy(baseDate));

  tempDay.value = date.get('date').toString().toString().padStart(2, '0');
  tempMonth.value = (date.get('month') + 1).toString().padStart(2, '0');
  tempYear.value = date.get('year').toString();

  tempDate.value = date;

  setCalendarMonth(tempDate.value);
  //   tempDate.value = date;

  //   console.log(date);

}

function checkInput (type: 'date' | 'month' | 'year', input: KeyboardEvent) {
  
  if (whitelistedKeys.includes(input.key)) return;

  const element = input.target as HTMLInputElement;
  const newDate = tempDate.value?.clone();

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

    if(tempValue === '0' && tempValue.length === 1) return;  

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

    if(!selectedMonth || selectedMonth.days < +tempDay.value) {

      input.preventDefault();
      return;

    }

  }

  /**
  * this allows only dates that would result in a valid date
  * the days of february are subject to change, due that we need to check if the input year still matches the days of february
  */
  if(type === 'year') {

    const daysOfTargetMonth = dayjs().set('date', +tempDay.value).set('month', +tempMonth.value - 1).set('year', +tempValue).daysInMonth();

    if(daysOfTargetMonth < +tempDay.value) {

      input.preventDefault();
      return;

    }

  }

}

function calculateOptionsStyle () {

  const element = triggerElement.value as HTMLElement;

  if( !element) {

    calculatedOptions.value = {};
    return;

  }

  const bounds = element.getBoundingClientRect();
  let top = bounds.top + element.offsetHeight;
  const positionTop = bounds.bottom + element.offsetHeight + 50 > window.innerHeight;

  if(positionTop) {
    top = bounds.top - 5 - element.offsetHeight;
  }

  calculatedOptions.value = {
    top        : `${top}px`,
    left       : `${bounds.left}px`,
    'min-width': '200px',
    // 'max-width': `${element.offsetWidth}px`,
  };

}

function toggleCalendar (open?: boolean) {

  calculateOptionsStyle();
  
  // reset to days view when opening the calendar
  mode.value = 'days';
  updateMonth();
  if(tempDate.value) setCalendarMonth(tempDate.value);

  if(open === undefined) {

    renderCalendar.value = !renderCalendar.value;

  } else {

    renderCalendar.value = open;

  }

}

function focus (input: FocusEvent) {

  const element = input.target as HTMLInputElement;

  element.select();

}

function blur (input: FocusEvent) {

  const element = input.target as HTMLInputElement;
  const type = element.classList[0];
  const requiredLength = ['day', 'month'].includes(type) 
    ? 2 
    : 4;

  if(!tempDate.value) return;

  if(element.value.length !== requiredLength) {

    if(type === 'day') {

      tempDay.value = tempDate.value.get('date').toString().padStart(2, '0');

    }

    if(type === 'month') {

      tempMonth.value = (tempDate.value.get('month') + 1).toString().padStart(2, '0');

    }

    if(type === 'year') {

      tempYear.value = (tempDate.value.get('year')).toString();

    }

  }

}

/**
 * focus automatically the next input element unless the focus is already on the year
 */
function focusNext () {

  const orderArray = ['day', 'month', 'year'];
  const currentFocus = document.activeElement;

  if(currentFocus?.nodeName !== 'INPUT') return;

  const currentPart = currentFocus?.classList[0];
  const currentIndex = orderArray.findIndex((single) => single === currentPart);

  if(currentIndex < 2) {

    const newFocus = inputElements[currentIndex + 1];

    newFocus.value?.focus();

  }

}

/**
 * set the new date if the length requirements are matched
 * triggers focusNext
 */
function update () {

  if(!tempDay.value || tempDay.value.length < 2 || 
    !tempMonth.value || tempMonth.value.length < 2 || 
    !tempYear.value || tempYear.value.length < 4
  ) return;

  tempDate.value = dayjs().set('date', +tempDay.value).set('month', +tempMonth.value - 1).set('year', +tempYear.value);

  focusNext();
  setCalendarMonth(tempDate.value);
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

function getCalendarElements (date: dayjs.Dayjs) {

  const elementsToDisplay = props.monthVisible || 1;
  const elements: DatepickerCalendarElement[] = [];
  const days = (elementsToAdd = 0) => {

    const baseDate = date.set('date', 15).add(elementsToAdd, 'month').startOf('month').startOf('week');
    const targetElement: DatepickerCalendarElement = {
      days : [], 
      month: date.set('date', 15).add(elementsToAdd, 'month')
    }

    for (let day = 0; day < 42; day++) {
  
      const currentWorkDate = baseDate.add(day, 'day');

      targetElement.days?.push({
        day           : currentWorkDate, 
        isToday       : currentWorkDate.isSame(dayjs(), 'day'),
        isSelected    : currentWorkDate.isSame(tempDate.value, 'date'),
        isCurrentMonth: currentWorkDate.isSame(targetElement.month, 'month')
      });

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

function selectDate (singleDay: {day: dayjs.Dayjs}) {

  tempDate.value = singleDay.day.clone();
  setTemp(tempDate.value);

  if(!props.stayOpenOnSelect) toggleCalendar(false);

}

function isSelected (day: dayjs.Dayjs) {

  return day.isSame(tempDate.value, 'date');

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
    <section class="datepicker-partial" :class="[`monthVisible${props.monthVisible}`]" :style="monthVisibleCss">
        <section class="input-container" ref="triggerElement">
            <input @keydown="checkInput('date', $event)" class="day" ref="day" @focus="focus" @blur="blur" v-model="tempDay"  />
            <span class="delimiter">.</span>
            <input @keydown="checkInput('month', $event)" class="month" ref="month" @focus="focus" @blur="blur" v-model="tempMonth" />
            <span class="delimiter">.</span>
            <input @keydown="checkInput('year', $event)" class="year" ref="year" @focus="focus" @blur="blur" v-model="tempYear" />
            <lila-button-partial color-scheme="icon" @click="toggleCalendar"><lila-icons-partial size="small" type="chevron-down" /></lila-button-partial>
        </section>

        <lila-overlay-background-partial v-if="renderCalendar" background="none" ref="options" @mounted="calculateOptionsStyle" @close="toggleCalendar(false)">
          <section class="calendar-container" :key="$helpers.date(useMonthForCalender, 'MMYYYY')" :style="calculatedOptions">
            <section class="controls">
              <lila-button-group-partial>
                <lila-button-partial @click="modifyCalendarMonth('next', props.monthVisible)" color-scheme="icon"><lila-icons-partial size="small" type="chevron-right" /></lila-button-partial>
                <lila-button-partial @click="modifyCalendarMonth('prev', props.monthVisible)" color-scheme="icon"><lila-icons-partial size="small" type="chevron-left" /></lila-button-partial>
              </lila-button-group-partial>
              </section>
              <section class="elements-container">
                <article class="single-element" v-for="(singleElement, index) in calendarElements" :key="`month-${index}`">

                  <template v-if="mode ==='days'">

                    <h3 role="button" @click="toggleMode">{{ $helpers.date(singleElement.month, 'MMMM') }} {{ $helpers.date(singleElement.month, 'YYYY') }}</h3>
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
                      <template v-for="(singleDay, index) in singleElement.days" :key="`day-${index}`">
  
                        <div v-if="singleDay.isCurrentMonth" role="button" class="day active" 
                          :class="{currentMonth: singleDay.isCurrentMonth, today: singleDay.isToday, isSelected: isSelected(singleDay.day)}"  @click="selectDate(singleDay)">
                          {{ $helpers.date(singleDay.day, 'D') }}
                        </div>
                        <div v-if="!singleDay.isCurrentMonth" class="day">
                          {{ $helpers.date(singleDay.day, 'D') }}
                        </div>
  
                      </template>
                    </section>
                    
                  </template>

                  <template v-if="mode ==='month'">

                    <h3 role="button" @click="toggleMode">{{ $helpers.date(singleElement.year, 'YYYY') }}</h3>
                    <article class="selection-container">
                      <section role="button" class="single-month" v-for="(singleMonth, index) in singleElement.months" :key="`month-${index}`" @click="selectCalendarMonth(singleMonth)">
                        {{ $helpers.date(singleMonth, 'MMMM') }}
                      </section>
                    </article>

                  </template>

                  <template v-if="mode ==='years'">

                    <h3 role="button" @click="toggleMode">{{ $helpers.date(singleElement.from, 'YYYY') }} - {{ $helpers.date(singleElement.to, 'YYYY') }}</h3>
                    <article class="selection-container">
                      <section role="button" class="single-year" v-for="(singleYear, index) in singleElement.years" :key="`month-${index}`" @click="selectCalendarYear(singleYear)">
                        {{ $helpers.date(singleYear, 'YYYY') }}
                      </section>
                    </article>

                  </template>

                </article>
              </section>

          </section>
      </lila-overlay-background-partial>

    </section>
</template>
<style lang="less" scoped>
.datepicker-partial {
    display: grid;
    grid-template-columns: max-content;

    .input-container {
        display: grid;
        grid-template-columns: 17px max-content 17px max-content 35px 35px;
        overflow: hidden;
        border-bottom: 1px @color1 solid;
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

    .calendar-container {
      display: grid;
      position: absolute;
      background-color: @white;
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.13);
      border: solid 1px @grey1;

      .controls {
        background-color: @grey1;
      }

      @media @desktop {
        width: calc(var(--monthVisible) * 350px);
      }

      h3 {
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

        .single-month, .single-year {
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

          .multi(padding, 0, 2);
          
          &:nth-child(4), &:nth-child(5), &:nth-child(6) {
            border-top: solid 1px @grey;
          }

          &:nth-child(2), &:nth-child(5),  {
            border-left: solid 1px @grey;
            border-right: solid 1px @grey;
          }
  
          header, .days-container {
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

              &.isSelected {
                background-color: @color3;
                color: @white;
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
              &:nth-child(7n), &:nth-child(7n -1) {
                .font-bold;
              }
            }
          }

          header {
            .header-day {
              &:nth-child(7n), &:nth-child(7n -1) {
                .font-bold;
              }
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
        grid-template-columns: repeat(2, 1fr);
      }
    }

      &.monthVisible3 {
      .elements-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
    }

      &.monthVisible6 {

        .calendar-container {
          @media @desktop {
            width: calc(3 * 350px);
          }
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