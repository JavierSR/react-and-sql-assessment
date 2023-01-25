const moment = require('moment')

module.exports = {
    getMinutesDifference: (dateA, dateB) => moment.duration(dateA.diff(dateB)).asMinutes(),
    getFullDateTime: ({ date, time, addDay }) => {
        const dateTime = moment(date)
        //There is a record wich shift end time is earliest than start time, I assume that it lasts until next day
        //so the right end date is one day later
        if(addDay) {
            dateTime.add(1, 'days')
        }
        const [ hour, minute, second ] = time.split(':')
        dateTime.set({
            hour, minute, second
        })
        return dateTime
    }
}