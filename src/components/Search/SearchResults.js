import React from 'react';
import {UserFoundItem} from "./UserFoundItem";
import {UserNotFoundItem} from "./UserNotFoundItem";

export default function SearchResults({items}) {
    return (
        <div className="mb-3 medialist section search-results">
            {
                items.length > 0
                    ? items.map(x => <UserFoundItem user={x} key={x.id}/>)
                    : <UserNotFoundItem/>
            }
        </div>
    );
}