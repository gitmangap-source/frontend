function createChapter() {

    return {
        mangaId: new URLSearchParams(location.search).get("manga_id"),
        number: "",
        title: "",
        pages: [""],

        async save() {
            try {
                const chapter = await api("/chapters/manga/" + this.mangaId, {
                    method: "POST",
                    body: JSON.stringify({
                        title: this.title || "Capítulo " + this.number,
                        chapter_number: parseInt(this.number)
                    })
                });

                const pagesToSend = this.pages
                    .filter(p => p.trim() !== "")
                    .map((url, index) => ({
                        image_url: url,
                        page_number: index + 1
                    }));

                if (pagesToSend.length > 0) {
                    await api("/chapters/" + chapter.id + "/pages", {
                        method: "POST",
                        body: JSON.stringify(pagesToSend)
                    });
                }

                location.href = "manga-detail.html?id=" + this.mangaId;
            } catch(e) {
                alert(e.message);
            }
        }
    };
}
