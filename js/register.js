function registerPage() {

    return {
        username: "",
        email: "",
        password: "",

        async register() {
            try {
                await api("/auth/register", {
                    method: "POST",
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                });
                location.href = "login.html";
            } catch(e) {
                alert(e.message);
            }
        }
    };
}
