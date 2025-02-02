import React, {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {API} from "../../scripts/consts";

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

    return (
        <div className="container-xd">
            <main role="main" className="pb-3">
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
                                                    data.activities[index].length &&
                                                    data.activities[index].map((x) => (
                                                        <div
                                                            className="am3-activity"
                                                            style={{
                                                                '--height': percentH(x.progress),
                                                                '--color-blue': x.media.cover.color
                                                            }}>
                                                            {x.episodes}
                                                        </div>
                                                    ))
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
                        </React.Fragment>
                        : <div className="section-name error">{error ? error : 'Loading...'}</div>
                }
            </main>
        </div>
    );
}