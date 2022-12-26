import React, {useEffect, useMemo, useState} from 'react';
import ButtonTab from "../../../common/button/ButtonTab";
import {PercentageOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import ReportAmountForm from "./report-amount-form";
import {useSelector} from "react-redux";
import ReportManual from "./report-manual";

const ReportProgressModal = ({workId, progressType, disable}) => {
    const [open, setOpen] = useState(false);
    const {isCloseDrawer} = useSelector(state => state.commonReducer);

    const onClickButton = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (isCloseDrawer) {
            onClose();
        }
    }, [isCloseDrawer]);

    const form = useMemo(() => {
        switch (progressType) {
            case "byAmount":
                return <ReportAmountForm workId={workId}/>
            case "manual":
                return <ReportManual workId={workId}/>
            default:
                return <></>
        }
    }, [progressType]);

    return (
        <>
            <ButtonTab
                icon={<PercentageOutlined style={{fontSize: 20}}/>}
                title={"Báo cáo"}
                buttonProps={{
                    onClick: onClickButton
                }}
                disable={disable}
            />
            <Modal
                open={open}
                destroyOnClose={true}
                title={"Báo cáo tiến độ"}
                onCancel={onClose}
                okButtonProps={{htmlType: "submit", form: "report-progress-form", type: "primary"}}
                // okText={buttonTitle}
            >
                {form}
            </Modal>
        </>
    );
};

ReportProgressModal.propTypes = {};

export default ReportProgressModal;
