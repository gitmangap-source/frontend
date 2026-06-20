function createChapter() {

    return {
        mangaId: new URLSearchParams(location.search).get("manga_id"),
        number: "",
        title: "",
        pages: [""],

        async save() {
            try {
                await api("/mangas/" + this.mangaId + "/chapters", {
                    method: "POST",
                    body: JSON.stringify({
                        number: parseFloat(this.number),
                        title: this.title,
                        pages: this.pages.filter(p => p.trim() !== "")
                    })
                });
                location.href = "manga-detail.html?id=" + this.mangaId;
            } catch(e) {
                alert(e.message);
            }
        }
    };
}
