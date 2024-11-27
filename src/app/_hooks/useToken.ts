"use client";

import { useContext } from "react";
import { TokenContext } from "@/app/_context/token.context";

export function useToken() {
    const contextValue = useContext(TokenContext);

    if (Object.entries(contextValue).length === 0) {
        throw new Error("useTheme must be called from within an TokenContextProvider");
    }

    return contextValue;
}
