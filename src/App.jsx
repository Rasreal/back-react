import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.tsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchAvailablePlaces, fetchUserPlaces, updateUserPlaces} from "./http.js";
import {Error} from "./components/Error.jsx";

function App() {
    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [errorUpdPlaces, setErrorUpdPlaces] = useState(null);


    useEffect(() => {
        async function fetchPlaces() {
            setFetching(true);
            try{
                const places = await fetchUserPlaces();
                setUserPlaces(places);
            } catch (error) {
                setErrorUpdPlaces({
                    message: error.message || "Fetch qate bolyp qaldy",
                });
            }

            setFetching(false);
        }

        fetchPlaces();
    }, [])
    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if(!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if(prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });

        try {
            await updateUserPlaces([selectedPlace, ...userPlaces]);

            console.log("success");
        } catch (err) {
            setUserPlaces(userPlaces);
            setErrorUpdPlaces(
                {
                    message: err.message || "Qate bolyp qaldy",
                }
            );

        }

    }

    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );

        try{
            await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
        } catch(err) {
            setUserPlaces(userPlaces);
            setErrorUpdPlaces(
                {
                    message: err.message || "Zhoyilmady, qate bolyp qaldy",
                }
            );
        }

        setModalIsOpen(false);
    }, []);


    function handleError() {
        setErrorUpdPlaces(null);
    }

    return (
        <>
            <Modal open={errorUpdPlaces} onClose={handleError}>
                {errorUpdPlaces &&
                    <Error title="Qate shyqty" message={errorUpdPlaces.message} onClose={handleError}/>}
            </Modal>
            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="Осындай жерлерді көргім келеді ..."
                    fallbackText="Барғығыз, көргіңіз келетін жерді таңдаңыз ..."
                    places={userPlaces}
                    isLoading={isFetching}
                    loadingText="Fetch-it etip otyr..."
                    onSelectPlace={handleStartRemovePlace}
                />

                <AvailablePlaces onSelectPlace={handleSelectPlace}/>
            </main>
        </>
    );
}

export default App;
