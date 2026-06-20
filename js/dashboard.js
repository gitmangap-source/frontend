function dashboardPage() {
    return {
        mangas: [],
        loading: true,
        skeletons: [1, 2, 3, 4],

        async init() {
            this.loading = true;
            try {
                this.mangas = await api('/mangas');
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            } finally {
                this.loading = false;
            }
        },

        goToDetail(id) {
            Alpine.store('route').navigate('mangaDetail', { id });
        },

        goToCreate() {
            Alpine.store('route').navigate('mangaCreate');
        },

        async deleteManga(id) {
            if (!confirm('¿Eliminar este manga permanentemente? Se perderán todos sus capítulos.')) return;
            try {
                await api('/mangas/' + id, { method: 'DELETE' });
                this.mangas = this.mangas.filter(m => m.id !== id);
                Alpine.store('notifications').add('Manga eliminado', 'success');
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            }
        }
    };
}
