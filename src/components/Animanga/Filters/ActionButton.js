import React from "react";

export default function SwitchButton({title, setOption}) {

    const handleClick = () => setOption(true);

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