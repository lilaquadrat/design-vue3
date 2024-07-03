import dayjs from "dayjs";

export default {
    settings: {
        title      : 'Datepicker',
        description: 'Slide through multiple Images'
    },
    partials: [
        {
            textblock: {
                intro: 'single date with time, one month visible'
            },
            props: {
                monthVisible: 1,
                icon: 'calendar',
                time: true,
            }
        },
        {
            textblock: {
                intro: 'single date with time and seconds, one month visible'
            },
            props: {
                monthVisible: 1,
                icon: 'calendar',
                time: true,
                seconds: true,
            }
        },
        {
            textblock: {
                intro: 'single date, one month visible, in the next week'
            },
            props: {
                monthVisible: 1,
                after: dayjs(),
                before: dayjs().add(1, 'week'),
                icon: 'calendar',
                time: true,
                seconds: true,
            }
        },
        {
            textblock: {
                intro: 'single date, one month visible, date has to be in future, stays open on select'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                monthVisible: 1,
                stayOpenOnSelect: true,
                future: true,
                icon: 'calendar'
            }
        },
        {
            textblock: {
                intro: 'single date, three month visible, after two weeks in the future'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 3,
                after: dayjs().add(2, 'week'),
                time: true
            }
        },
        {
            textblock: {
                intro: 'single date, two month visible, before two weeks in the future'
            },
            props: {
                from: dayjs().add(1, 'month').subtract(1, 'week'),
                to: dayjs().add(1, 'month'),
                monthVisible: 2,
                before: dayjs().add(2, 'week'),
            }
        },
        {
            textblock: {
                intro: 'single date, two month visible, before two weeks in the future, stays open on select'
            },
            props: {
                from: dayjs().add(1, 'month').subtract(1, 'week'),
                to: dayjs().add(1, 'month'),
                monthVisible: 2,
                range: true,
                time: true,
                seconds: true,
                before: dayjs().add(2, 'week')
            }
        },
        {
            textblock: {
                intro: 'single date, two month visible, before two weeks in the future, stays open on select'
            },
            props: {
                from: dayjs().add(1, 'month').subtract(1, 'week'),
                to: dayjs().add(1, 'month'),
                monthVisible: 2,
                range: true,
                time: true,
                before: dayjs().add(2, 'week')
            }
        },
        {
            textblock: {
                intro: 'single date, three month visible, before two weeks in the future'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 3,
                before: dayjs().add(2, 'week')
            }
        },
        {
            textblock: {
                intro: 'single date, three month visible, date has to be in the past, stays open on select'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 1,
                stayOpenOnSelect: true,
                past: true
            }
        },
        {
            textblock: {
                intro: 'range, six month visible, stays open on select'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 6,
                stayOpenOnSelect: true,
                range: true
            }
        },
        {
            textblock: {
                intro: 'range, three month visible, future dates, stays open on select'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 6,
                range: true,
                future: true,
                icon: 'calendar'
            }
        }
    ]
}

