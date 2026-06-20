function mangaDetail() {

    return {
        id: new URLSearchParams(location.search).get("id"),
        manga: {},
        chapters: [],

        async load() {
            try {
                this.manga = await api("/mangas/" + this.id);
                try {
                    this.chapters = await api("/mangas/" + this.id + "/chapters");
                } catch(e) {
                    this.chapters = [];
                }
            } catch(e) {
                alert(e.message);
            }
        }
    };
}
