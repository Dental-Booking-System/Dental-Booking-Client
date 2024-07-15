export const localeDateStringToISODateString = (dateString: string): string => {
    const [day, month, year] = dateString.split('/').map(Number);

    // Ensure single digits are converted to two digits
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
};

export const toVietnamDateString = (date: Date) : string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh'
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedParts = formatter.formatToParts(date);
    // Extract date components
    let month, day, year;
    formattedParts.forEach(({ type, value }) => {
        if (type === 'year') {
            year = value;
        } else if (type === 'month') {
            month = value;
        } else if (type === 'day') {
            day = value;
        }
    });

    return `${year}-${month}-${day}`;
}

export const isoTimeToLocalTimeString = (time: string): string => {
    const [hoursStr, minutesStr, secondsStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const period = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert '0' hours to '12'

    // Return formatted time
    return minutes > 0 ? `${hours}:${minutes} ${period}` : `${hours}:00 ${period}`;
};
