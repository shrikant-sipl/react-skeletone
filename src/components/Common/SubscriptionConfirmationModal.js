import React from "react";
import {langs} from "../../config/localization";

const SubscriptionConfirmationModal = ({course_price, cancelSubscription, confirmSubscription}) =>
{
    return (
        <div className="modal-modules-sign">
            <div className="modal-modules-sign-header">
                <h3>{langs.subscription_banner_heading}</h3>
                {/*<h5>R${course_price.toFixed(2)}/{langs.per_month}</h5>*/}
            </div>
            <div className="modal-modules-sign-content">
                <h5>{langs.subscription_banner_title}</h5>
                <p>{langs.subscription_banner_desc}</p>
            </div>
            <div className="modal-modules-sign-action">
                <div className="row">
                    <div className="column medium-6">
                        <a href="javascript:void(0)" className="cta cta-bordered" onClick={cancelSubscription}><span>{langs.not_now}</span></a>
                    </div>
                    <div className="column medium-6 text-right">
                        <a href="javascript:void(0)" className="cta cta-bordered" onClick={confirmSubscription}><span>{langs.sign_it}</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {SubscriptionConfirmationModal};
