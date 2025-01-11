import Places from './Places.tsx';
import {useEffect, useState} from "react";
import {Error} from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";


export default function AvailablePlaces({onSelectPlace}) {

    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState(null);
    const [isFetching, setFetching] = useState(false);
    useEffect(() => {
        async function fetchPlaces() {
            setFetching(true);
            try {
                const places = await fetchAvailablePlaces();

                navigator.geolocation.getCurrentPosition((pos) => {
                    const sortedPlaces = sortPlacesByDistance(
                        places,
                        pos.coords.latitude,
                        pos.coords.longitude
                    );

                    setAvailablePlaces(sortedPlaces);

                });
            } catch (error) {
                console.error(error);
                setError({message: error.message || "Qate bolyp qaldy"});
            }
            setFetching(false);
        }

        fetchPlaces();

    }, []);

    if (error) {
        return <Error title="An error occurred!" message={error.message} />;
    }


    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText={"Fetching"}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
