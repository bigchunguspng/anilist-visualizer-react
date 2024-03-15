import useFetch from "../../useFetch";
import React, {createContext, useEffect, useRef, useState} from "react";
import {cookiesHas, groupEntries, setCookie, switchMode} from "../../scripts/scripts";
import Entry from "./Entry";
import Filters from "./Filters";

export default function Animanga({id}) {

    // DATA
    const baseUrl = 'http://localhost:5000/api/animanga/';

    const [url, setUrl] = useState(baseUrl + id);
    const [entries, setEntries] = useState(null);
    const [header, setHeader] = useState(null);

    const visibleCount = useRef(0);

    const {data: animanga, error} = useFetch(url);

    const handleYearsSelection = (from, to) => setUrl(`${baseUrl + id}/${from}/${to}`);


    // COOKIES
    const [language, setLanguage] = useState(cookiesHas('lang=japanese') ? "japanese" : "english");
    const [grouping, setGrouping] = useState(cookiesHas('group=grouped') ? "grouped" : "default");
    const [ordering, setOrdering] = useState(cookiesHas('order=reverse') ? "reverse" : "default");

    const options = useRef({});

    useEffect(() => {
        options.current.language = language;
        setCookie('lang', language);
    }, [language]);

    useEffect(() => {
        options.current.grouping = grouping;
        setCookie('group', grouping);
    }, [grouping]);

    useEffect(() => {
        options.current.ordering = ordering;
        setCookie('order', ordering);
    }, [ordering]);


    // GAMING
    useEffect(() => document.addEventListener("keydown", handleKeyDown), []);

    const handleKeyDown = (event) => {
        let key = event.which;

        if /**/ (key === 74) switchMode(setLanguage, options.current.language, 'english', 'japanese');
        else if (key === 71) switchMode(setGrouping, options.current.grouping, 'default', 'grouped');
        else if (key === 82) switchMode(setOrdering, options.current.ordering, 'default', 'reverse');
    };


    // OTHER
    const getVisibleEntries = () => animanga.entries.filter(x => x.timelineItem !== null);

    const applyGrouping = (entries) => grouping === "grouped" ? groupEntries(entries) : getVisibleEntries();

    useEffect(() => {
        if (entries) setEntries(applyGrouping(entries));
    }, [grouping]);

    useEffect(() => {
        if (animanga) {
            const visible = getVisibleEntries();
            visibleCount.current = Object.keys(visible).length;
            setEntries(applyGrouping(visible));
        }
    }, [animanga]);

    useEffect(() => {
        if (animanga && entries) {
            const total = Object.keys(animanga.entries).length;
            const shown = visibleCount.current;
            setHeader(`${shown}/${total} titles · ${animanga.seriesShown}/${animanga.seriesTotal} series`);
        }
    }, [entries]);


    return (
        <div className="container-xd">
            <main role="main" className="pb-3">
                {
                    animanga && entries ?
                        <OptionsContext.Provider
                            value={{language, setLanguage, grouping, setGrouping, ordering, setOrdering}}>
                            <Filters
                                header={header}
                                years={animanga.years}
                                handleYears={handleYearsSelection}/>
                            <div>
                                <div
                                    id="animanga"
                                    className="medialist section"
                                    style={{
                                        display: "flex",
                                        flexDirection: ordering === "reverse" ? "column-reverse" : "column"
                                    }}>
                                    {
                                        entries.length > 0 ?
                                            entries.map((x, index) => (
                                                x === '-' ?
                                                    <hr key={index}/> :
                                                    <Entry
                                                        entry={x}
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

export const OptionsContext = createContext(null);