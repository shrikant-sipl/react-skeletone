import React from "react";
import {langs} from "../../config/localization";

const Loader = ({loaderContent}) =>
{
    let content = `${langs.loading}...`;

    if(loaderContent == 'form-submission') {
        content = `${langs.request_processing}.`;
    }
    
    return (
        <div className="loader-wrap">
            <div className="loader">
                <div className="loader-icons">
                    <span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span><span className="loader-item"></span>
                </div>
                <div className="loader-content">{content}</div>
            </div>
        </div>
    )
}

export {Loader};
