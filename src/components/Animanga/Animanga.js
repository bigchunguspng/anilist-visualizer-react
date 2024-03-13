import useFetch from "../../useFetch";
import React, {useEffect} from "react";
import {ChangeOrder, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import Entry from "./Entry";
import Filters from "./Filters";

function Animanga({id}) {

    const {data: animanga, error} = useFetch(`http://localhost:5000/api/animanga/${id}`);
    const entries = animanga && animanga.entries.filter(x => x.timelineItem !== null)

    const countTotal = animanga ? Object.keys(animanga.entries).length : 0;
    const countEntry = animanga ? Object.keys(entries).length : 0;

    const header = animanga ? `${countEntry}/${countTotal} titles · ${animanga.seriesShown}/${animanga.seriesTotal} series` : "";

    const handleKeyDown = (event) => {
        let key = event.which;

        if (key === 74) SwitchLanguage();
        else if (key === 71) ToggleGrouping();
        else if (key === 82) ChangeOrder();
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (animanga) {
            let cookies = document.cookie.toString();
            if (cookies.includes('lang=japanese')) SwitchLanguage();
            if (cookies.includes('group=groups')) ToggleGrouping();
            if (cookies.includes('reverse=reverse')) ChangeOrder();
            console.log(cookies);
        }
    }, [animanga]);

    return (

        <div className="container-xd">
            <main role="main" className="pb-3">
                {
                    animanga ?
                        <React.Fragment>
                            <Filters header={header} years={animanga.years}/>
                            <div>
                                <div className="medialist section" id="animanga">
                                    {entries.length > 0 ? entries.map((x, index) => (
                                        <Entry
                                            item={x}
                                            minDay={animanga.minDay}
                                            maxDay={animanga.maxDay}
                                            years={animanga.years}
                                            index={index}
                                            key={x.id}/>
                                    )) : <div>user was too busy touching grass to watch anime</div>}
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