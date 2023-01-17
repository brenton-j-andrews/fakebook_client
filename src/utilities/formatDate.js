// Format createdAt date attached to documents for timestamp display on posts and comments.

import { millisecondsToMinutes, toDate, format } from 'date-fns';

const formatDate = (timestamp, isPost) => {

    let dateInMinutes = millisecondsToMinutes(Date.now() - Date.parse(timestamp));
    let returnString = '';

    // If date is less than 24 hours previous.
    if (dateInMinutes < 1440) {
        if (dateInMinutes <= 1 ) {
            isPost ? returnString = 'Posted just now.' : returnString = 'Just now';
        }

        else if (dateInMinutes < 60) {
            isPost ? returnString = `Posted ${dateInMinutes} minutes ago.` : returnString = `${dateInMinutes} minutes ago`;
        }

        else {
            let formattedHours = Math.round(dateInMinutes / 60)
            console.log(formattedHours);

            if (formattedHours  === 1) {
                isPost ? returnString = `Posted 1 hour ago` : returnString = `1 hour ago`;
            } else {
                isPost ? returnString = `Posted ${formattedHours} hours ago.` : returnString = `${formattedHours} hours ago`;
            }

        }
    }

    // If date was more than 24 hours ago.
    else {  

        let date = toDate(Date.parse(timestamp))
        let formattedTime = format(date, 'p');

        if (dateInMinutes < 2880) {
            isPost ? returnString = `Posted yesterday at ${formattedTime}`: returnString = `Yesterday at ${formattedTime}`;
        }
        else {
            let formattedDate =  format(date, 'P');
            isPost ? returnString = `Posted on ${formattedDate} at ${formattedTime}`: returnString = `${formattedDate} at ${formattedTime}`;
        }
    }

    return returnString;
}

export { formatDate };