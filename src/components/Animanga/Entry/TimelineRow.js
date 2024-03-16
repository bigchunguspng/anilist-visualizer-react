import React from 'react';

export default function TimelineRow({sections, timeframe, text}) {

    const classText = text ? " text" : "";

    return (
        <div className={"timeline-row" + classText}>
            {
                Object.keys(sections).map((x, index) => {

                    const percent = sections[x] / timeframe * 100 + '%'
                    const classes = "timeline-year" + classText;
                    const content = text ? x : "";

                    return (<div className={classes} style={{width: percent}} key={index}>{content}</div>)
                })
            }
        </div>
    )
}