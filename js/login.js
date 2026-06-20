function loginPage() {

    return {
        email: "",
        password: "",

        async login() {
            try {
                const result = await api("/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });
                localStorage.setItem("token", result.access_token);
                location.href = "dashboard.html";
            } catch (e) {
                alert(e.message);
            }
        }
    };
}
