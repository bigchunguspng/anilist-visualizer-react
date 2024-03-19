import React from "react";

export function UserNotFoundItem() {
    return (
        <div className="search-result entry">
            <div className="cover">
                <div
                    className="image"
                    style={{backgroundImage: "url(https://i.imgur.com/tmno0VA.png)"}}/>
            </div>
            <div className="title">Nobody Was Found</div>
            <div className="last-seen">XD</div>
        </div>
    )
}