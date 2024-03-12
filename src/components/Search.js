import React from 'react';

function Search({items}) {
    return (
        <div className="mb-3 medialist section search-results">
            {items.length > 0 ? items.map((x) => (
                <React.Fragment key={x.id}>
                    <SearchResultItem user={x}/>
                </React.Fragment>
            )) : <NotFoundSearchResult/>}
        </div>
    );
}

function SearchResultItem({user}) {
    return (
        <a className="search-result entry" href={`/user/` + user.name}>
            <div className="cover">
                <div
                    className="image"
                    style={{
                        backgroundImage: `url(${user.avatar.large}), url(${user.avatar.medium})`
                    }}>
                </div>
            </div>
            <div className="title">{user.name}</div>
            <div className="last-seen">{user.lastActivity}</div>
        </a>
    );
}

function NotFoundSearchResult() {
    return (
        <div className="search-result entry">
            <div className="cover">
                <div
                    className="image"
                    style={{
                        backgroundImage: "url(https://i.imgur.com/tmno0VA.png)"
                    }}></div>
            </div>
            <div className="title">Nobody Was Found</div>
            <div className="last-seen">XD</div>
        </div>
    )
}

export default Search;