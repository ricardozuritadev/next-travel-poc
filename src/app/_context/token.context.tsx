"use client";

import React, { createContext, useEffect, useState } from "react";

type TokenContextModel = {
    token: string | null;
};

type TokenContextProviderProps = {
    children: React.ReactNode;
};

export const TokenContext = createContext({} as TokenContextModel);

export default function TokenContextProvider({ children }: TokenContextProviderProps) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const fetchToken = async () => {
            try {
                const response = await fetch("/api/token");

                if (!response.ok) {
                    throw new Error("Error fetching token");
                }

                const { token } = await response.json();
                setToken(token.access_token);

                const expiresIn = 1800 * 1000; // 30 minutes

                if (interval) clearInterval(interval);
                interval = setInterval(fetchToken, expiresIn);
            } catch (error) {
                console.log(error);
            }
        };

        fetchToken();

        return () => clearInterval(interval);
    }, []);

    const providerValue = {
        token
    };

    return <TokenContext.Provider value={providerValue}>{children}</TokenContext.Provider>;
}
