import React from 'react';
import UploadFile from "./upload";
import FileList from "./list";
import {Row} from "antd";
import PropTypes from "prop-types";

const SWFile = (props) => {
    return (
        <>
            <FileList
                {...props}
            />
        </>
    );
};

SWFile.propTypes = {
    projectId: PropTypes.number,
    phaseId: PropTypes.number,
    workId: PropTypes.number,
    moduleId: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,
}


export default SWFile;
