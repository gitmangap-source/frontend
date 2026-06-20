function dashboard() {

    return {
        mangas: [],

        async load() {
            try {
                this.mangas = await api("/mangas");
            } catch(e) {
                alert(e.message);
            }
        },

        logout() {
            localStorage.removeItem("token");
            location.href = "login.html";
        }
    };
}
