import { renderTag } from "../../../common/status";

export const getDeadline = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();

    const deadline = Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));

    if (deadline > 1) {
        return renderTag(`Quá hạn ${deadline} ngày`, "error");
    } else if (deadline < 1) {
        return renderTag(`Còn ${Math.abs(deadline)} ngày`, "success");
    } else if (deadline === 1) {
        return renderTag(`Đến hạn`, "volcano");
    } else if (deadline === 0) {
        return renderTag(`Hoàn thành`, "success");
    }
};
