// Format createdAt date attached to documents for timestamp display on posts and comments.

import { millisecondsToMinutes, toDate, format } from 'date-fns';

const formatDate = (timestamp, isPost) => {

    let dateInMinutes = millisecondsToMinutes(Date.now() - Date.parse(timestamp));
    let formattedDateString = '';

    // If date is less than 24 hours previous.
    if (dateInMinutes < 1440) {
        if (dateInMinutes <= 1 ) {
            isPost ? formattedDateString = 'Posted just now.' : formattedDateString = 'Just now';
        }

        else if (dateInMinutes < 60) {
            isPost ? formattedDateString = `Posted ${dateInMinutes} minutes ago.` : formattedDateString = `${dateInMinutes} minutes ago`;
        }

        else {
            let formattedHours = Math.round(dateInMinutes / 60)

            if (formattedHours  === 1) {
                isPost ? formattedDateString = `Posted 1 hour ago` : formattedDateString = `1 hour ago`;
            } else {
                isPost ? formattedDateString = `Posted ${formattedHours} hours ago.` : formattedDateString = `${formattedHours} hours ago`;
            }

        }
    }

    // If date was more than 24 hours ago.
    else {  

        let date = toDate(Date.parse(timestamp))
        let formattedTime = format(date, 'p');

        if (dateInMinutes < 2880) {
            isPost ? formattedDateString = `Posted yesterday at ${formattedTime}`: formattedDateString = `Yesterday at ${formattedTime}`;
        }
        else {
            let formattedDate =  format(date, 'P');
            isPost ? formattedDateString = `Posted on ${formattedDate} at ${formattedTime}`: formattedDateString = `${formattedDate} at ${formattedTime}`;
        }
    }

    return formattedDateString;
}

export { formatDate };