import {useEffect, useState} from "react";

export function useFetch(fetchFunc, initialValue ) {

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {

        async function fetchData() {
            setIsFetching(true);
            try {
                const places = await fetchFunc();
                setFetchedData(places);

                console.log('Available places:', places);

            } catch (error) {
                setError({
                    message: error.message || "Fetch qate bolyp qaldy",
                });
            }

            setIsFetching(false);
        }

        fetchData();


    }, [fetchFunc]);




    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error,
    }
}