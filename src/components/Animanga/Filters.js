import {ChangeOrder, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import React from "react";

function Filters({header, years}) {

    const yearsArray = Object.keys(years);

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
                <select className="section" defaultValue={yearsArray[0]}>
                    {
                        yearsArray.map((x) => {
                            return (<option value={x} key={x}>{x}</option>)
                        })
                    }
                </select>
                <div> To:</div>
                <select className="section" defaultValue={yearsArray[yearsArray.length - 1]}>
                    {
                        yearsArray.map((x) => {
                            return (<option value={x} key={x}>{x}</option>)
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default Filters;