import { getTokens } from "@/app/_lib/amadeus-token";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const token = await getTokens();
        return NextResponse.json({ token });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error getting token" }, { status: 500 });
    }
}
