document.addEventListener('alpine:init', () => {
    Alpine.store('reader', {
        chapterId: null,
        pages: [],
        currentPage: 0,

        async load(chapterId) {
            this.chapterId = chapterId;
            this.currentPage = 0;
            try {
                const data = await api('/reader/read/' + chapterId);
                this.pages = data.pages || [];
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
                this.pages = [];
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
        },

        progress() {
            if (!this.pages.length) return 0;
            return ((this.currentPage + 1) / this.pages.length) * 100;
        },

        handleKeydown(e) {
            if (e.key === 'ArrowRight') { this.nextPage(); e.preventDefault(); }
            if (e.key === 'ArrowLeft') { this.prevPage(); e.preventDefault(); }
        }
    });
});
