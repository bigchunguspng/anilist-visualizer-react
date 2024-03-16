import {useEffect, useState} from "react";

export function useDoubleTitle(option, valueA, titleA, titleB) {

    const getTitle = () => option === valueA ? titleA : titleB;

    const [title, setTitle] = useState(getTitle());

    useEffect(() => setTitle(getTitle()), [option]);

    return title;
}