function registerPage() {

    return {
        username: "",
        email: "",
        password: "",

        async register() {
            if (!this.username || !this.email || !this.password) { alert("Completa todos los campos"); return; }

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
