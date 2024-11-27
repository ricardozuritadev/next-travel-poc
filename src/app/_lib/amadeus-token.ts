import axios from "axios";
const qs = require("qs");

export async function getTokens() {
    const data = qs.stringify({
        client_id: "TJy1k1B0jRs1ralwaBphHTlGJjGaYiR7",
        client_secret: "DGBeMzJny3gFpGN5",
        grant_type: "client_credentials"
    });

    const config = {
        method: "post",
        url: "https://test.api.amadeus.com/v1/security/oauth2/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
    };

    interface TokenResponse {
        access_token: string;
        token_type: string;
        expires_in: number;
        state: string;
    }

    interface TokenError {
        error: string;
        error_description: string;
    }

    try {
        const response = await axios(config);
        const tokenData: TokenResponse = response.data;
        return tokenData;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const errorData: TokenError = error.response.data;
            console.error("Error:", errorData.error);
            console.error("Description:", errorData.error_description);
        } else {
            console.error("An unexpected error occurred:", error.message);
        }
        throw error;
    }
}
