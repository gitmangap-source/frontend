function mangaDetailPage() {
    return {
        manga: {},
        chapters: [],
        loading: true,

        get id() {
            return Alpine.store('route').params.id;
        },

        async init() {
            if (!this.id) {
                Alpine.store('notifications').add('ID de manga no especificado', 'error');
                Alpine.store('route').navigate('dashboard');
                return;
            }
            this.loading = true;
            try {
                this.manga = await api('/mangas/' + this.id);
                try {
                    this.chapters = await api('/mangas/' + this.id + '/chapters');
                } catch {
                    this.chapters = [];
                }
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            } finally {
                this.loading = false;
            }
        },

        goToCreateChapter() {
            Alpine.store('route').navigate('chapterCreate', { manga_id: this.id });
        },

        goToReader(chapterId) {
            Alpine.store('route').navigate('reader', { chapter_id: chapterId, manga_id: this.id });
        },

        goBack() {
            Alpine.store('route').navigate('dashboard');
        }
    };
}
