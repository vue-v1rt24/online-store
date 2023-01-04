export const formattedPrice = (val: number | string) => {
    val = +val;

    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency',
    }).format(val);
};