import React from 'react';

function TimelineRow({years, timeframe, text}) {

    const classText = text ? " text" : "";

    return (
        <div className={"timeline-row" + classText}>
            {
                Object.keys(years).map((x, index) => {

                    const percent = years[x] / timeframe * 100 + '%'
                    const classes = "timeline-year" + classText;
                    const content = text ? x : "";

                    return (<div className={classes} style={{width: percent}} key={index}>{content}</div>)
                })
            }
        </div>
    )
}

export default TimelineRow;