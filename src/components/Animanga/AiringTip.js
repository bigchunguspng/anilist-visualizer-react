import React from "react";

function AiringTip({airing, percent}) {
    return (
        <div className="timeline-item releasing stripes"
             style={{
                 marginLeft: percent(airing.offset),
                 width: percent(airing.length)
             }}>
            <div className="season">{airing.season}</div>
        </div>
    )
}

export default AiringTip;