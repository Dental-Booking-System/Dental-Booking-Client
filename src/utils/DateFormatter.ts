export const localeDateStringToISODateString = (dateString: string): string => {
    const [day, month, year] = dateString.split('/').map(Number);

    // Ensure single digits are converted to two digits
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
};

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
