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
                <button className="section" onClick={SwitchLanguage}>
                    <span id="lang" a="english" b="japanese">日本語</span>
                </button>
                <button className="section" onClick={ToggleGrouping}>
                    <span id="group" a="default" b="groups">Group</span>
                </button>
                <button className="section" onClick={ChangeOrder}>
                    <span id="reverse" a="default" b="reverse">Reverse</span>
                </button>
                <div> From:</div>
                <select className="section" value={from} onChange={e => setFrom(e.target.value)}>
                    {
                        years.map((x) => {
                            return (<option value={x} key={x}>{x}</option>)
                        })
                    }
                </select>
                <div> To:</div>
                <select className="section" value={to} onChange={e => setTo(e.target.value)}>
                    {
                        years.map((x) => {
                            return (<option value={x} key={x}>{x}</option>)
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default Filters;