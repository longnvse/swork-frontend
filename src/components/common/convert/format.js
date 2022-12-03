export const DG_Format_Money = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
