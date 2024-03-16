import React from "react";
import {switchMode} from "../../../scripts/scripts";
import {useDoubleTitle} from "../../../hooks/useDoubleTitle";

export default function SwitchButton({titleA, titleB, valueA, valueB, option, setOption}) {

    const title = useDoubleTitle(option, valueA, titleA, titleB);

    const handleClick = () => switchMode(setOption, option, valueA, valueB);

    return (
        <button
            className="section"
            onClick={handleClick}>
            <span>
                {title}
            </span>
        </button>
    );
}