function requireAuth() {
    if (!localStorage.getItem("token")) {
        location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    location.href = "login.html";
}

function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch {
        return null;
    }
}
