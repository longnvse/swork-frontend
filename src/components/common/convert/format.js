export const formatMoney = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
