import {useEffect, useState} from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                else throw Error('BRUH...')
            })
            .then(data => setData(data))
            .catch(e => setError(e.message));
    }, [url]);

    return {data, error};
}

export default useFetch;