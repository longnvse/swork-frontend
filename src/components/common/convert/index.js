import {formatMoney} from "./format";

export function convertMoney(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? parseFloat(Number((Number(labelValue)) / 1.0e+9).toFixed(2)) + " tỷ"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? parseFloat(Number((Number(labelValue) / 1.0e+6)).toFixed(2)) + " triệu"
            // Three Zeroes for Thousands
            : formatMoney(labelValue)
}
