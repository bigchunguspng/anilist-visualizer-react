import {useState} from "react";
import Search from "./Search";


function Home() {

    const [query, setQuery] = useState('');
    const [items, setItems] = useState();

    function handleSearch() {
        fetch(`http://localhost:5000/api/user/search/${query}`)
            .then(response => {
                if (!response.ok) throw Error('BRUH...')
                return response.json();
            })
            .then(data => setItems(data))
        console.log(items);
    }

    function searchOnKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className='home'>
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
                        onKeyDown={e => searchOnKeyDown(e)}
                        onChange={e => setQuery(e.target.value)}/>
                </div>
                <div id="users">
                    {items && <Search items={items}/>}
                </div>
                <p>Go to <a href="https://anilist.co">AniList</a> if you don't get it.</p>
            </div>
        </div>
    );
}

export default Home;