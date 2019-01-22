import React from "react";
import {fileTypeAndIcon} from "../../actions/Common";

const Document = ({contentType, url}) =>
{
    let {fileIcon} = fileTypeAndIcon(contentType);

    return (
        <div className="download-img">
            <img src={`/assets/images/${fileIcon}`} />
        </div>
    )
}

export {Document};
