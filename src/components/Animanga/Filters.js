import {ChangeOrder, SwitchLanguage, ToggleGrouping} from "../../scripts/scripts";
import React, {useContext, useEffect, useRef, useState} from "react";
import {OptionsContext} from "./Animanga";

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
                <SwitchButton
                    id="lang"
                    a0="english"
                    b0="japanese"
                    titleA="日本語"
                    titleB="English"
                    onClick={SwitchLanguage}/>
                <SwitchButton
                    id="group"
                    a0="default"
                    b0="groups"
                    titleA="Group"
                    titleB="Restore"
                    onClick={ToggleGrouping}/>
                <SwitchButton
                    id="reverse"
                    a0="default"
                    b0="reverse"
                    titleA="Reverse"
                    titleB="Reverse"
                    onClick={ChangeOrder}/>
                <YearSelection
                    title="From:"
                    years={years}
                    year={from}
                    setYear={setFrom}/>
                <YearSelection
                    title="To:"
                    years={years}
                    year={to}
                    setYear={setTo}/>
            </div>
        </div>
    )
}

export default Filters;


function SwitchButton({titleA, titleB, a0, b0, onClick}) {

    const options = useContext(OptionsContext);
    const [title, setTitle] = useState(options.language === a0 ? titleA : titleB);

    const switchMode = () => {
        options.setLanguage(options.language === b0 ? a0 : b0);
    }

    useEffect(() => {
        setTitle(options.language === a0 ? titleA : titleB)
    }, [options.language]);

    return (
        <button className="section" onClick={switchMode}>
            <span>{title}</span>
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