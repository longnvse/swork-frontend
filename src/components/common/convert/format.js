export const formatMoney = (value) => {
    if(typeof value === 'number'){
        value = `${value}`;
    }
    const regex = /^\d+\.?\d{1,2}/;
    const valueExec = regex.exec(value)?.[0] || value;
    return valueExec?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
