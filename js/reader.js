function reader() {

    return {
        chapterId: new URLSearchParams(location.search).get("chapter_id"),
        pages: [],
        currentPage: 0,

        async load() {
            try {
                const chapter = await api("/chapters/" + this.chapterId);
                this.pages = chapter.pages || [];
            } catch(e) {
                alert(e.message);
            }
        },

        nextPage() {
            if (this.currentPage < this.pages.length - 1) {
                this.currentPage++;
            }
        },

        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        }
    };
}
