import {ChangeOrder, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import React, {useEffect, useState} from "react";

function Filters({header, years, handleYears}) {

    const min = years[0];
    const max = years[years.length - 1];

    const [from, setFrom] = useState(min);
    const [to, setTo] = useState(max);

    const [fromWas, setFromWas] = useState(from);
    const [toWas, setToWas] = useState(to);

    useEffect(() => {
        if (from === fromWas && to === toWas) return;

        setFromWas(from);
        setToWas(to);
        handleYears(from, to);
    }, [from, to]);

    return (
        <div className="control-panel">
            <div className="section-name">
                <h3>All</h3>
                <div>{header}</div>
            </div>
            <div className="actions" id="buttons">
                <ActionButton id="lang" a="english" b="japanese" title="日本語" onClick={SwitchLanguage}/>
                <ActionButton id="group" a="default" b="groups" title="Group" onClick={ToggleGrouping}/>
                <ActionButton id="reverse" a="default" b="reverse" title="Reverse" onClick={ChangeOrder}/>
                <YearSelection title="From:" years={years} year={from} setYear={setFrom}/>
                <YearSelection title="To:" years={years} year={to} setYear={setTo}/>
            </div>
        </div>
    )
}

export default Filters;


function ActionButton({id, title, a, b, onClick}) {
    return (
        <button className="section" onClick={onClick}>
            <span id={id} a={a} b={b}>{title}</span>
        </button>
    );
}

function YearSelection({title, years, year, setYear}) {
    return (
        <React.Fragment>
            <div>
                {title}
            </div>
            <select className="section" value={year} onChange={e => setYear(e.target.value)}>
                {
                    years.map((x) => {
                        return (<option value={x} key={x}>{x}</option>)
                    })
                }
            </select>
        </React.Fragment>
    );
}