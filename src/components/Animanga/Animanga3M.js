import React, {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {API} from "../../scripts/consts";
import {tipHide, tipShowA3M} from "../../scripts/scripts";

export default function Animanga3M({id}) {

    // DATA
    const endpoint = API + '/activities/';

    const [url, setUrl] = useState(endpoint + id + '/last-3-months');
    const [data, setData] = useState(null);
    const {data: animanga, error} = useFetch(url);

    useEffect(() => {
        if (animanga) {
            setData(animanga);
        }
    }, [animanga]);

    const percent = (x) => (data ? (x / animanga.smallerUnits.length) * 100 + '%' : '0%');
    const percentH = (x) => (data ? (x / animanga.maxProgressValue) * 100 + '%' : '0%');

    const getInfo = (x) => {
        let info = `<p>${x.media.title.english}</p>`;
        if (x.episodes)
            info += `<p>${x.episodes}</p>`;
        info += `<p>${x.progress} ${x.media.type === 0 ? 'episode' : 'chapter'}${x.progress > 1 ? 's' : ''}</p>`;
        return info;
    }

    const highlightSeries = (x) => {
        const className = `media-${x.media.id}`;
        const type = x.media.type === 0 ? 'anime' : 'manga';
        const prefix = `https://s4.anilist.co/file/anilistcdn/media/${type}/cover/`;
        const bg = `url("${prefix}${x.media.cover.large}"), url("${prefix}${x.media.cover.medium}")`;
        document.getElementById("image").style.setProperty("background-image", bg);
        document.querySelectorAll(`.am3-activity`).forEach(el => el.classList.remove("semi"));
        document.querySelectorAll(`.am3-activity:not(.${className})`).forEach(el => el.classList.add("semi"));
    };
    const unHighlightAll = () => {
        document.querySelectorAll(`.am3-activity`).forEach(el => el.classList.remove("semi"));
    }

    // todo: mouse over / out = show / hide image, highlight / un-highlight other

    return (
        <div className="container-xd" onDoubleClick={unHighlightAll}>
            <main role="main" className="pb-3" style={{'position': 'relative'}}>
                {
                    data ?
                        <React.Fragment>
                            <div id="days">
                                {
                                    data.smallerUnits.length > 0 ?
                                        data.smallerUnits.map((x, index) => (
                                            <div
                                                className="am3-day"
                                                style={{
                                                    '--width': percent(x.value)
                                                }}>
                                                <div
                                                    className="am3-day-title">
                                                    {x.title}
                                                </div>
                                                {
                                                    data.activities[index].length ?
                                                        data.activities[index].map((x) => (
                                                            <div
                                                                className={`am3-activity tip-rect-ref media-${x.media.id}`}
                                                                onMouseOver={event => tipShowA3M(event.target, getInfo(x))}
                                                                onMouseOut={tipHide}
                                                                onMouseDown={() => highlightSeries(x)}
                                                                style={{
                                                                    '--height': percentH(x.progress),
                                                                    '--color-blue': x.media.cover.color
                                                                }}>
                                                            </div>
                                                        )) : <span/>
                                                }
                                            </div>
                                        )) : <div className="am3-day">-</div>
                                }
                            </div>
                            <div id="months">
                                {
                                    data.biggerUnits.length > 0 ?
                                        data.biggerUnits.map((x) => (
                                            <div
                                                className="am3-month"
                                                style={{
                                                    '--width': percent(x.value)
                                                }}>
                                                {x.title}
                                            </div>
                                        )) : <div className="am3-month">-</div>
                                }
                            </div>
                            <div className="hint-message-div">
                                <span className="hint-message">
                                    Single click - highlight specific title.<br/>
                                    Double click - restore.
                                </span>
                            </div>
                            <div className="am3-image" id="image"/>
                            <div className="tipbox absolute">
                                <span id="tip" style={{'margin': '0px'}}></span>
                            </div>
                        </React.Fragment>
                        : <div className="section-name error">{error ? error : 'Loading...'}</div>
                }
            </main>
        </div>
    );
}