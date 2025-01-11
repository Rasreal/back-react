
export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if(!response.ok){
        throw new Error(`Could not fetch available places`);
    }
    return resData.places;

}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

    if(!response.ok){
        throw new Error(`Could not fetch user places`);
    }
    return resData.places;

}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(!response.ok){
        throw new Error(`Could not update user places`);
    }
    const resData = await response.json();

    return resData.message;
}