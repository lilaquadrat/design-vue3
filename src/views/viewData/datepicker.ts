import dayjs from "dayjs";

export default {
    settings: {
        title      : 'Datepicker',
        description: 'Slide through multiple Images'
    },
    partials: [
        {
            textblock: {
                intro: 'single date, one month visible, in the next week'
            },
            props: {
                monthVisible: 1,
                stayOpenOnSelect: true,
                after: dayjs(),
                before: dayjs().add(1, 'week'),
            }
        },
        {
            textblock: {
                intro: 'single date, one month visible, date has to be in future'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 1,
                stayOpenOnSelect: true,
                future: true
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
                after: dayjs().add(2, 'week')
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
                intro: 'single date, three month visible, date has to be in the past'
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
                intro: 'range, six month visible'
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
                intro: 'range, three month visible, future dates'
            },
            props: {
                from: dayjs().subtract(1, 'week'),
                to: dayjs().add(1, 'week'),
                monthVisible: 6,
                stayOpenOnSelect: true,
                range: true,
                future: true
            }
        }
    ]
}

