import {formatMoney} from "./format";

export function convertMoney(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9) + " tỷ"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6) + " triệu"
            // Three Zeroes for Thousands
            : formatMoney(labelValue)
}
