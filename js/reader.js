function readerPage() {
    return {
        loading: true,

        get chapterId() {
            return Alpine.store('route').params.chapter_id;
        },

        init() {
            if (!this.chapterId) {
                Alpine.store('notifications').add('ID de capítulo no especificado', 'error');
                Alpine.store('route').navigate('dashboard');
                return;
            }
            this.loading = true;
            Alpine.store('reader').load(this.chapterId).then(() => {
                this.loading = false;
            });
        },

        nextPage() {
            Alpine.store('reader').nextPage();
        },

        prevPage() {
            Alpine.store('reader').prevPage();
        },

        goToPage(index) {
            Alpine.store('reader').currentPage = index;
        },

        handleKeydown(e) {
            if (e.key === 'ArrowRight') { Alpine.store('reader').nextPage(); e.preventDefault(); }
            if (e.key === 'ArrowLeft') { Alpine.store('reader').prevPage(); e.preventDefault(); }
        },

        goBack() {
            const mangaId = Alpine.store('route').params.manga_id;
            if (mangaId) {
                Alpine.store('route').navigate('mangaDetail', { id: mangaId });
            } else {
                Alpine.store('route').navigate('dashboard');
            }
        }
    };
}
