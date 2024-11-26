import { getTokens } from "@/app/_lib/amadeus-token";

export function useToken() {
    const token = setTimeout(() => {
        getTokens();
    }, 1500);

    console.log("=> token: ", token);
}
