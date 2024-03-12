import {ChangeOrder, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import React from "react";

function Filters({header}) {
    return (
        <div className="control-panel">
            <h3 className="section-name">{header}</h3>
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
            </div>
        </div>
    )
}

export default Filters;