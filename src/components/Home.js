import {useState} from "react";
import SearchResults from "./Search/SearchResults";
import {API} from "../scripts/consts";
import useFetch from "../hooks/useFetch";

function Home() {

    const [url, setUrl] = useState(null);
    const [query, setQuery] = useState('');

    const {data: users} = useFetch(url);

    const triggerSearch = () => setUrl(API + '/user/search/' + query);

    const onKeyDown = e => {
        if (e.key === 'Enter') triggerSearch();
    };

    return (
        <main className='home pb-3'>
            <div className="text-center">
                <img
                    className="logo"
                    draggable="false"
                    src="https://i.imgur.com/tgGcE0v.png"
                    alt="AniList Visualizer (WHOLESOME 100 | ifunny.co)"/>
                <div className="searchbar">
                    <input
                        id="user-search"
                        className="search section"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your username"
                        onKeyDown={e => onKeyDown(e)}
                        onChange={e => setQuery(e.target.value)}/>
                </div>
                <div id="users">
                    {
                        users && <SearchResults items={users}/>
                    }
                </div>
                <p>Go to <a href="https://anilist.co">AniList</a> if you don't get it.</p>
            </div>
        </main>
    );
}

export default Home;