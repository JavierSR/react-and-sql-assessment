import moment from 'moment'

export const formatDate = (dateString) => moment(dateString).format('YYYY-MM-DD')

export const formatTime = (timeString) => moment(timeString, 'HH:mm:ss').format('hh:mm A')