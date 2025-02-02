import React, {useContext, useEffect, useState} from "react";
import {OptionsContext} from "../AnimangaClassic";
import SwitchButton from "./SwitchButton";
import ActionButton from "./ActionButton";
import YearSelection from "./YearSelection";

export default function Filters({header, years, handleYears, handleLastYear}) {

    // YEARS
    const min = years[0];
    const max = years[years.length - 1];

    const [from, setFrom] = useState(min);
    const [to, setTo] = useState(max);

    const [fromWas, setFromWas] = useState(from);
    const [toWas, setToWas] = useState(to);

    const [lastYear, setLastYear] = useState(false);
    const [lastYearWas, setLastYearWas] = useState(lastYear);

    useEffect(() => {
        if (lastYear === lastYearWas) return;

        handleLastYear(lastYear);
        setLastYearWas(lastYear);
    }, [lastYear]);

    useEffect(() => {
        if (from === fromWas && to === toWas) return;

        setLastYear(false);
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
                {
                    lastYear === false &&
                    <ActionButton
                        title="Last year"
                        setOption={setLastYear}/>
                }
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