import axios from "axios";
let qs = require("qs");

export async function getTokens() {
    let data = qs.stringify({
        client_id: "roCAGZF86xv9vj4oPYXgIhXWEvxEWY1s",
        client_secret: "2NmjaoE1fpqdCzbT",
        grant_type: "client_credentials"
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://test.api.amadeus.com/v1/security/oauth2/token?client_id=roCAGZF86xv9vj4oPYXgIhXWEvxEWY1s&client_secret=2NmjaoE1fpqdCzbT&grant_type=client_credentials",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return JSON.stringify(response.data.access_token);
    } catch (error) {
        console.log(error);
    }
}
