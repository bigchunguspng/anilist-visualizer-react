import useFetch from "../../hooks/useFetch";
import React, {createContext, useEffect, useRef, useState} from "react";
import {cookiesHas, groupEntries, setCookie, switchMode} from "../../scripts/scripts";
import Entry from "./Entry/Entry";
import Filters from "./Filters/Filters";
import {API, C_GRP, C_LNG, C_ORD, DEF, ENG, GRP, JAP, REV} from "../../scripts/consts";

export const OptionsContext = createContext(null);

export default function Animanga({id}) {

    // DATA
    const endpoint = API + '/animanga/';

    const [url, setUrl] = useState(endpoint + id);
    const [entries, setEntries] = useState(null);
    const [header, setHeader] = useState(null);

    const visibleCount = useRef(0);

    const {data: animanga, error} = useFetch(url);

    const handleYearsSelection = (from, to) => setUrl(`${endpoint + id}/${from}/${to}`);
    const handleLastYear = (lastYear) => { if (lastYear) setUrl(`${endpoint + id}/last-year`); }


    // COOKIES
    const [language, setLanguage] = useState(cookiesHas(C_LNG + '=' + JAP) ? JAP : ENG);
    const [grouping, setGrouping] = useState(cookiesHas(C_GRP + '=' + GRP) ? GRP : DEF);
    const [ordering, setOrdering] = useState(cookiesHas(C_ORD + '=' + REV) ? REV : DEF);

    const options = useRef({});

    useEffect(() => {
        options.current.language = language;
        setCookie(C_LNG, language);
    }, [language]);

    useEffect(() => {
        options.current.grouping = grouping;
        setCookie(C_GRP, grouping);
    }, [grouping]);

    useEffect(() => {
        options.current.ordering = ordering;
        setCookie(C_ORD, ordering);
    }, [ordering]);


    // GAMING
    useEffect(() => document.addEventListener("keydown", handleKeyDown), []);

    const handleKeyDown = (event) => {
        let key = event.which;

        if /**/ (key === 74) switchMode(setLanguage, options.current.language, ENG, JAP);
        else if (key === 71) switchMode(setGrouping, options.current.grouping, DEF, GRP);
        else if (key === 82) switchMode(setOrdering, options.current.ordering, DEF, REV);
    };


    // OTHER
    const getVisibleEntries = () => animanga.entries.filter(x => x.timelineItem !== null);

    const applyGrouping = (entries) => grouping === GRP ? groupEntries(entries) : getVisibleEntries();

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
                                handleYears={handleYearsSelection}
                                handleLastYear={handleLastYear}/>
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
                                                        userId={id}
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