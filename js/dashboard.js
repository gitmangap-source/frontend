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

        goToDetail(id) {
            location.href = "manga-detail.html?id=" + id;
        },

        async deleteManga(id) {
            if (!confirm("¿Eliminar este manga permanentemente? Se perderán todos sus capítulos.")) return;
            try {
                await api("/mangas/" + id, { method: "DELETE" });
                this.mangas = this.mangas.filter(m => m.id !== id);
                alert("Manga eliminado");
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
