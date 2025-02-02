import React, {createContext, useState} from "react";
import AnimangaClassic from "./AnimangaClassic";
import Animanga3M from "./Animanga3M";

export const OptionsContext = createContext(null);

export default function Animanga({id}) {

    const [type, setType] = useState("classic");

    return (
        <React.Fragment>
            <div className="nav-wrap">
                <div className="container-xd nav">
                    <button className="nav-link" onClick={() => setType("classic")}>
                        <span>Overview</span>
                    </button>
                    <button className="nav-link" onClick={() => setType("3m")}>
                        <span>Last 3 months</span>
                    </button>
                </div>
            </div>
            {
                type === "classic" ? <AnimangaClassic id={id}/> : <Animanga3M id={id}/>
            }
        </React.Fragment>
    )
}