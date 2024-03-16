import React from "react";

export function UserSearchResultItem({user}) {

    const avatar = user.avatar;

    return (
        <a className="search-result entry" href={`/user/` + user.name}>
            <div className="cover">
                <div
                    className="image"
                    style={{backgroundImage: `url(${avatar.large}), url(${avatar.medium})`}}/>
            </div>
            <div className="title">{user.name}</div>
            <div className="last-seen">{user.lastActivity}</div>
        </a>
    );
}