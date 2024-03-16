import React from "react";

export default function YearSelection({title, years, year, setYear}) {
    return (
        <React.Fragment>
            <div>
                {title}
            </div>
            <select
                className="section"
                value={year}
                onChange={e => setYear(e.target.value)}>
                {
                    years.map((x) => {
                        return (<option key={x} value={x}>{x}</option>)
                    })
                }
            </select>
        </React.Fragment>
    );
}