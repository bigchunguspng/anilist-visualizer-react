import React from "react";
import SiteLogo from "../SiteLogo";
import './UserHeader.css'

function UserHeader({user}) {
    return (
        <header className="user">
            <SiteLogo/>
            <div className="banner-shadow"></div>
            <div className="container-xd user-info">
                <a href={user.url}>
                    <img className="avatar" src={user.avatar.large} alt="avatar.jpeg"/>
                </a>
                <div className="text">
                    <h1 className="user-name">{user.name}</h1>
                    <p className="user-count">Last activity: {user.lastActivity}</p>
                </div>
            </div>
        </header>
    )
}

export default UserHeader;