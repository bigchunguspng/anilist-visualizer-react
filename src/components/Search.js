import React from 'react';

function Search({items}) {

    //const {data, isPending, error} = useFetch(`http://localhost:5000/api/user/search/${props.query}`);

    return (
        <div className="mb-3 medialist section">
            {items && items.map((x) => (
                <div key={x.id}>
                    <SearchResultItem user={x}/>
                </div>
            ))}
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
                        width: '48px',
                        height: '48px',
                        backgroundImage: `url(${props.user.avatar.largeImageUrl}), url(${props.user.avatar.mediumImageUrl})`}}>
                </div>
            </div>
            <div className="title">{props.user.name}</div>
            <div className="last-seen">{props.user.lastSeen}</div>
        </a>
    );
}

export default Search;