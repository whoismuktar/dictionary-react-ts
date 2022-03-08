import { useState, useEffect } from "react";

interface Req {
    url: string
}

const useFetch = (url: Req["url"]) => {
    const [data, setData] = useState(null)
    const [dataErr, setDataErr] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                return setData(data)
            }).catch((err) => {
                return setDataErr(err)
            }).finally(() => {
                return setLoading(false)
            })
    }, [url]);

    return {data, dataErr, loading}
}

export default useFetch;
