import React from "react";

function AiringTip({left, width, season}) {
    return (
        <div className="timeline-item releasing stripes"
             style={{
                 marginLeft: left,
                 width: width
             }}>
            <div className="season">{season}</div>
        </div>
    )
}

export default AiringTip;