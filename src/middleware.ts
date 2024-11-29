// src/middleware.ts
import { NextResponse } from "next/server";

let cachedToken: string | null = null; // Token cacheado
let tokenExpiration: number | null = null; // Marca de tiempo de expiración

// Función para solicitar un nuevo token
async function fetchNewToken() {
    const response = await fetch("http://localhost:3000/api/token");
    if (!response.ok) {
        throw new Error("Error fetching token");
    }
    const { token } = await response.json();

    // Configura la expiración del token (ejemplo: 30 minutos)
    tokenExpiration = Date.now() + 1800 * 1000;
    cachedToken = token;

    return token;
}

interface MiddlewareRequest {
    headers: Headers;
    nextUrl: URL;
}

interface MiddlewareResponse {
    headers: Headers;
}

export async function middleware(req: MiddlewareRequest): Promise<MiddlewareResponse> {
    // Verifica si el token ha expirado
    if (!cachedToken || !tokenExpiration || Date.now() > tokenExpiration) {
        await fetchNewToken();
    }

    // Agrega el token como encabezado
    const res = NextResponse.next();
    res.headers.set("x-token", cachedToken || "");
    return res;
}

// Configuración del middleware: aplica a todas las rutas excepto las excluidas
export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico).*)"] // Aplica a todas las rutas menos las especificadas
};
