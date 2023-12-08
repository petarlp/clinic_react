export const dateFormatBgHour = (isoDate) => {
    const date = new Date(isoDate);
    //const day = date.getDate();
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth() + 1; // Month starts from 0
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits with leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits with leading zero if needed


    const formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

    return formattedDate;
}

