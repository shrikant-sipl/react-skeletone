import React from "react";
import {langs} from "../../config/localization";

const ProfileHeader = ({userImage, name, averageRating, followingCount, followersCount}) => {
    return (
        <div className="profile-header">
            <div className="row">
                <div className="columns medium-3">
                    <div className="user-pic-big">
                        <span style={{ backgroundImage: `url(${userImage})` }}></span>
                    </div>
                    <div className="edit-user-link">
                        <a href="/edit-profile">{langs.edit_profile}</a>
                    </div>
                </div>
                <div className="columns medium-9">
                    <h2>{name}</h2>
                    <p>{langs.current_average}</p>
                    <ul className="ratings">
                        <li><i className={averageRating < 1 ? "icon-ic-star diaabled" : "icon-ic-star"}></i></li>
                        <li><i className={averageRating < 2 ? "icon-ic-star diaabled" : "icon-ic-star"}></i></li>
                        <li><i className={averageRating < 3 ? "icon-ic-star diaabled" : "icon-ic-star"}></i></li>
                        <li><i className={averageRating < 4 ? "icon-ic-star diaabled" : "icon-ic-star"}></i></li>
                        <li><i className={averageRating < 5 ? "icon-ic-star diaabled" : "icon-ic-star"}></i></li>
                    </ul>
                    <div className="follower">
                        <a href="/following-users" className="cta cta-bordered">
                            <span>
                                <small>{followingCount}</small>
                                {langs.following}
                            </span>
                        </a>
                        <a href="/followers" className="cta cta-bordered">
                            <span>
                                <small>{followersCount}</small>
                                {langs.followers}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProfileHeader };
