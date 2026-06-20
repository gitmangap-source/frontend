const API_URL = "http://localhost:8000/api";

function token() {
    return localStorage.getItem("token");
}

async function api(url, options = {}) {

    const headers = {
        "Content-Type": "application/json"
    };

    if (token()) {
        headers["Authorization"] =
            `Bearer ${token()}`;
    }

    const response = await fetch(
        `${API_URL}${url}`,
        {
            ...options,
            headers: {
                ...headers,
                ...(options.headers || {})
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Error"
        );
    }

    return data;
}
