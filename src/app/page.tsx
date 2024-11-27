"use client";

import { useToken } from "./_hooks/useToken";

export default function Home() {
    const token = useToken();

    console.log("=> token: ", token);

    return <div>main page</div>;
}
