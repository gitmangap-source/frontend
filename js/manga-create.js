function createManga() {

    return {
        title: "",
        description: "",
        cover_url: "",

        async save() {
            try {
                const body = {
                    title: this.title,
                    description: this.description
                };
                if (this.cover_url.trim()) {
                    body.cover_url = this.cover_url.trim();
                }

                await api("/mangas", {
                    method: "POST",
                    body: JSON.stringify(body)
                });

                location.href = "dashboard.html";
            } catch(e) {
                alert(e.message);
            }
        }
    };
}
