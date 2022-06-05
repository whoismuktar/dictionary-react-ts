import { useState, useEffect } from "react";

interface Req {
    url: string
}

const useFetch = (url: Req["url"]) => {
    const [data, setData] = useState([])
    const [dataErr, setDataErr] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {        
        if (!url) return

        setLoading(true)
        
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            }).catch((err) => {
                setDataErr(err)
            }).finally(() => {
                setLoading(false)
            })
        }, [url]);
        
    return {data, dataErr, loading}
}

export default useFetch;
