export const handleDataNull = (data: string | number) => {
    if (data === null) {
        return '';
    } else {
        return data;
    }
};