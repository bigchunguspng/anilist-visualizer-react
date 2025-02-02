import React, {useContext} from "react";
import {OptionsContext} from "../AnimangaClassic";
import {JAP} from "../../../scripts/consts";
import {useDoubleTitle} from "../../../hooks/useDoubleTitle";

export function Title({status, titles}) {

    const options = useContext(OptionsContext);

    const title = useDoubleTitle(options.language, JAP, titles.japanese, titles.english);

    return (
        <div
            className={"title " + status}>
            {title}
        </div>
    )
}