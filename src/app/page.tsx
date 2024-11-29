import { headers } from "next/headers";
import { getCity } from "./_lib/amadeus-api";

export default async function Home() {
    const headersList = await headers();
    const token = headersList.get("x-token");

    const city = await getCity(token as string);

    const cityCoordinates = JSON.parse(city).data[0].geoCode;
    console.log("=> cityCoordinates: ", cityCoordinates);

    return <div>main page</div>;
}
