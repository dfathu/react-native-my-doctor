export const getChatTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}:${minute} ${hour > 12 ? 'PM' : 'AM'}`;
}

export const setDateChat = (formDate) => {
    const year = formDate.getFullYear();
    const month = formDate.getMonth() + 1;
    const date = formDate.getDate();

    return `${year}-${month}-${date}`;
}