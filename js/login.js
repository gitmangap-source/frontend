function loginPage() {

    return {
        email: "",
        password: "",

        async login() {
            if (!this.email || !this.password) { alert("Completa todos los campos"); return; }

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
