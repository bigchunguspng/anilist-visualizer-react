import React, {useContext, useEffect, useState} from "react";
import {OptionsContext} from "./Animanga";

export default function Filters({header, years, handleYears}) {

    // YEARS
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

    // OTHER
    const options = useContext(OptionsContext);

    return (
        <div className="control-panel">
            <div className="section-name">
                <h3>All</h3>
                <div>{header}</div>
            </div>
            <div className="actions" id="buttons">
                <SwitchButton
                    valueA="english"
                    valueB="japanese"
                    titleA="日本語"
                    titleB="English"
                    option={options.language}
                    setOption={options.setLanguage}/>
                <SwitchButton
                    valueA="default"
                    valueB="grouped"
                    titleA="Group"
                    titleB="Restore"
                    option={options.grouping}
                    setOption={options.setGrouping}/>
                <SwitchButton
                    valueA="default"
                    valueB="reverse"
                    titleA="Reverse"
                    titleB="Reverse"
                    option={options.ordering}
                    setOption={options.setOrdering}/>
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

function SwitchButton({titleA, titleB, valueA, valueB, option, setOption}) {

    const getTitle = () => option === valueA ? titleA : titleB;

    const [title, setTitle] = useState(getTitle());

    const switchMode = () => {
        setOption(option === valueB ? valueA : valueB);
    }

    useEffect(() => setTitle(getTitle()), [option]);

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