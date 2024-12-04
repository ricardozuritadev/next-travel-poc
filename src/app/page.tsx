import { headers } from "next/headers";
import { getCity, getActivities } from "./_lib/amadeus-api";

import Slider from "./_components/Slider";

export default async function Home() {
    const headersList = await headers();
    const token = headersList.get("x-token");

    const city = await getCity(token as string);
    const cityCoordinates = JSON.parse(city).data[0];
    const activities = await getActivities(token as string, cityCoordinates);

    const cityActivities = JSON.parse(activities).data;

    return (
        <>
            <div>main page</div>
            <Slider
                title="Explore Our Popular Destinantions"
                data={cityActivities}
                id="activitiesSlider"
            />
        </>
    );
}
