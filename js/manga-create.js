function createManga() {

    return {
        title: "",
        description: "",

        async save() {
            try {
                await api("/mangas", {
                    method: "POST",
                    body: JSON.stringify({
                        title: this.title,
                        description: this.description
                    })
                });
                location.href = "dashboard.html";
            } catch(e) {
                alert(e.message);
            }
        }
    };
}
