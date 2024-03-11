import React from 'react';

function Search({items}) {

    //const {data, isPending, error} = useFetch(`http://localhost:5000/api/user/search/${props.query}`);

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

function SearchResultItem(props) {
    return (
        <a className="search-result entry" href={`/user/` + props.user.name}>
            <div className="cover">
                <div
                    className="image"
                    style={{
                        backgroundImage: `url(${props.user.avatar.large}), url(${props.user.avatar.medium})`
                    }}>
                </div>
            </div>
            <div className="title">{props.user.name}</div>
            <div className="last-seen">{props.user.lastActivity}</div>
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