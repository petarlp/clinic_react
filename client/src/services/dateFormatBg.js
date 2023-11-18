export const dateFormatBg = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month starts from 0
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
}

