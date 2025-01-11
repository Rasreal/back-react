import LoadingText from "./LoadingText";


interface Place {
    id: string;
    title: string;
    image: {
        src: string;
        alt: string;
    };
}

interface PlacesProps {
    title: string;
    places: Place[];
    fallbackText: string;
    onSelectPlace: (place: Place) => void;
    isLoading?: boolean;
    loadingText?: string;
}

const Places: React.FC<PlacesProps> = ({ title, places, fallbackText, onSelectPlace, isLoading, loadingText }) => {
    console.log(places);

    return (
        <section className="places-category">
            <h2>{title}</h2>
            {isLoading && <LoadingText loadingText={loadingText} />}
            {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
            {!isLoading && places.length > 0 && (
                <ul className="places">
                    {places.map((place) => (
                        <li key={place.id} className="place-item">
                            <button onClick={() => onSelectPlace(place)}>
                                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                                <h3>{place.title}</h3>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Places;
