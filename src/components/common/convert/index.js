import {formatMoney} from "./format";

export function convertMoney(labelValue) {
    if (!labelValue) {
        return "0";
    }
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? Number(labelValue) / 1.0e9 + " tỷ"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
            ? Number(labelValue) / 1.0e6 + " triệu"
            : // Three Zeroes for Thousands
            formatMoney(labelValue);
}
