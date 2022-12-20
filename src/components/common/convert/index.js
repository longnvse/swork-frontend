import { DG_Format_Money } from "./format";

export function convertMoney(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? Math.abs(Number(labelValue)) / 1.0e9 + " tỷ"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? Math.abs(Number(labelValue)) / 1.0e6 + " triệu"
        : // Three Zeroes for Thousands
          DG_Format_Money(labelValue);
}
