import React from 'react';
import {UserSearchResultItem} from "./UserSearchResultItem";
import {UserNotFoundSearchResult} from "./UserNotFoundSearchResult";

export default function SearchResults({items}) {
    return (
        <div className="mb-3 medialist section search-results">
            {
                items.length > 0
                    ? items.map(x => <UserSearchResultItem user={x} key={x.id}/>)
                    : <UserNotFoundSearchResult/>
            }
        </div>
    );
}