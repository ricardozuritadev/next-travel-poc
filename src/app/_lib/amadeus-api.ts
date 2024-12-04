import { City } from "@/_types/city.types";

export async function getCity(token: string) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(
            "https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=FR&keyword=PARIS&max=10&include=AIRPORTS",
            requestOptions
        );
        const result = await response.text();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getActivities(token: string, cityCoordinates: City) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const latitude = cityCoordinates.geoCode.latitude;
    const longitude = cityCoordinates.geoCode.longitude;

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(
            `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=1`,
            requestOptions
        );
        const result = await response.text();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
