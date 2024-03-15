import useFetch from "../../useFetch";
import React, {createContext, useEffect, useRef, useState} from "react";
import {ChangeOrder, cookiesHas, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import Entry from "./Entry";
import Filters from "./Filters";

function Animanga({id}) {

    const baseUrl = 'http://localhost:5000/api/animanga/';

    const [url, setUrl] = useState(baseUrl + id);
    const [entries, setEntries] = useState(null);
    const [header, setHeader] = useState(null);

    const {data: animanga, error} = useFetch(url);

    //const options = useRef(null);

    const [language, setLanguage] = useState(cookiesHas('lang=japanese') ? "japanese" : "english");
    const [ordering, setOrdering] = useState(cookiesHas('reverse=reverse') ? "reverse" : "default");

    useEffect(() => {
        document.cookie = 'lang=' + language + '; max-age=7776000; path=/';
    }, [language]);

    useEffect(() => {
        document.cookie = 'reverse=' + ordering + '; max-age=7776000; path=/';
    }, [ordering]);

    useEffect(() => {
        if (entries) {
            const copy = [...entries];
            setEntries(copy.reverse());
        }
    }, [ordering]);


    /*    useEffect(() => {
            document.addEventListener("keydown", handleKeyDown);
        }, []);*/

    useEffect(() => {
        if (animanga) {
            const visible = animanga.entries.filter(x => x.timelineItem !== null);
            setEntries(ordering === 'reverse' ? visible.reverse() : visible);
        }
    }, [animanga]);

    useEffect(() => {
        if (animanga && entries) {
            const countTotal = animanga ? Object.keys(animanga.entries).length : 0;
            const countEntry = animanga ? Object.keys(entries).length : 0;
            setHeader(`${countEntry}/${countTotal} titles · ${animanga.seriesShown}/${animanga.seriesTotal} series`);

            //handleCookies();
        }
        //if (options.current) handleActions(options.current);
    }, [entries]);

    const handleYearsChange = (from, to) => {
        //options.current = handleCookies();
        setUrl(`${baseUrl + id}/${from}/${to}`);
    }

/*
    const handleCookies = () => {
        let cookies = document.cookie.toString();
        let ops = {
            j: cookies.includes('lang=japanese'),
            g: cookies.includes('group=groups'),
            r: cookies.includes('reverse=reverse')
        }
        handleActions(ops);
        return ops;
    }
*/

/*
    const handleActions = ({j, g, r}) => {
        if (j) SwitchLanguage();
        if (g) ToggleGrouping();
        if (r) ChangeOrder();
    }

    const handleKeyDown = (event) => {
        let key = event.which;

        if (key === 74) SwitchLanguage();
        else if (key === 71) ToggleGrouping();
        else if (key === 82) ChangeOrder();
    }
*/


    return (

        <div className="container-xd">
            <main role="main" className="pb-3">
                {
                    animanga && entries ?
                        <OptionsContext.Provider value={{language, setLanguage, ordering, setOrdering}}>
                            <Filters
                                header={header}
                                years={animanga.years}
                                handleYears={handleYearsChange}/>
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
                        </OptionsContext.Provider>
                        : <div className="section-name error">{error ? error : 'Loading...'}</div>
                }
            </main>
        </div>
    )
}

export default Animanga;

export const OptionsContext = createContext(null);