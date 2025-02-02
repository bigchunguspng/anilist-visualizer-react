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

    return (
        <div className="container-xd">
            <main role="main" className="pb-3">
                {
                    data ?
                        <React.Fragment>
                            <div id="days">

                            </div>
                            <div id="months">
                                {data.biggerUnits[0].title}
                            </div>
                        </React.Fragment>
                        : <div className="section-name error">{error ? error : 'Loading...'}</div>
                }
            </main>
        </div>
    );
}