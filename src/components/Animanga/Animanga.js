import useFetch from "../../useFetch";
import React, {useEffect, useState} from "react";
import {ChangeOrder, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import Entry from "./Entry";
import Filters from "./Filters";

function Animanga({id}) {

    const baseUrl = 'http://localhost:5000/api/animanga/';

    const [url, setUrl] = useState(baseUrl + id);
    const [entries, setEntries] = useState(null);
    const [header, setHeader] = useState(null);

    const {data: animanga, error} = useFetch(url);

    useEffect(() => {
        console.log("ufx: keys")
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (animanga) {
            console.log("ufx: animanga");
            setEntries(animanga.entries.filter(x => x.timelineItem !== null));
        }
    }, [animanga]);

    useEffect(() => {
        if (animanga && entries) {
            console.log("ufx: animanga && entries");
            const countTotal = animanga ? Object.keys(animanga.entries).length : 0;
            const countEntry = animanga ? Object.keys(entries).length : 0;
            setHeader(`${countEntry}/${countTotal} titles · ${animanga.seriesShown}/${animanga.seriesTotal} series`);

            let cookies = document.cookie.toString();
            console.log(cookies);
            if (cookies.includes('lang=japanese')) SwitchLanguage();
            if (cookies.includes('group=groups')) ToggleGrouping();
            if (cookies.includes('reverse=reverse')) ChangeOrder();
        }
    }, [animanga, entries]);

    const handleKeyDown = (event) => {
        let key = event.which;

        if (key === 74) SwitchLanguage();
        else if (key === 71) ToggleGrouping();
        else if (key === 82) ChangeOrder();
    }

    const handleYears = (from, to) => {
        let endpoint = `${baseUrl + id}/${from}/${to}`;
        setUrl(endpoint);
        console.log(endpoint);
    }

    return (

        <div className="container-xd">
            <main role="main" className="pb-3">
                {
                    animanga && entries ?
                        <React.Fragment>
                            <Filters
                                header={header}
                                years={animanga.years}
                                handleYears={handleYears}/>
                            <div>
                                <div className="medialist section" id="animanga">
                                    {
                                        entries.length > 0 ?
                                            entries.map((x, index) => (
                                                <Entry
                                                    item={x}
                                                    key={x.id}
                                                    minDay={animanga.minDay}
                                                    maxDay={animanga.maxDay}
                                                    sections={animanga.timelineSections}
                                                    index={index}/>
                                            )) :
                                            <div className="error" style={{marginLeft: '15px'}}>
                                                This user was too busy touching grass 🦗🍀 to watch anime 📺
                                            </div>
                                    }
                                </div>
                                <div className="tipbox absolute">
                                    <span id="tip"></span>
                                </div>
                            </div>
                        </React.Fragment>
                        : <div className="section-name error">{error ? error : 'Loading...'}</div>
                }
            </main>
        </div>
    )
}

export default Animanga;