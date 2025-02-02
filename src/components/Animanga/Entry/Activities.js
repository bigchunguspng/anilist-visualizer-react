import React from 'react';
import "./Activities.css";

export default function Activities({activities, timeframe, minDay, color}) {

    const dayWidth = percent(1, timeframe);

    const items = activities.activities;

    return (
        <div className="days" style={{'--color-blue': color}}>
            {
                items.map((x, index) => {
                    return (
                        <div
                            className="day"
                            key={index}
                            style={{
                                width: dayWidth,
                                height: percent(x.progress, 8),
                                left: percent(x.day - minDay - 1, timeframe)
                            }}/>
                    )
                })
            }
        </div>
    );
}

const percent = (part, whole) => part / whole * 100 + '%';