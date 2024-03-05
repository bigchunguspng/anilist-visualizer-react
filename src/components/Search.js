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
        <div className='search-result-item'>
            <a className="search-result entry" href={props.user.url}>
                <div className="cover">
                    <div
                        className="image"
                        style={{backgroundImage: `url(${props.user.avatar.largeImageUrl}), url(${props.user.avatar.mediumImageUrl})`}}>
                    </div>
                </div>
                <div className="title">{props.user.name}</div>
                <div className="last-seen">{props.user.lastSeen}</div>
            </a>
        </div>
    );
}

export default Search;