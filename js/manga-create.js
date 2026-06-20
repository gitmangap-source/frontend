function mangaCreatePage() {
    return {
        title: '',
        description: '',
        cover_url: '',

        async save() {
            if (!this.title) {
                Alpine.store('notifications').add('El título es obligatorio', 'error');
                return;
            }
            try {
                const body = { title: this.title, description: this.description };
                if (this.cover_url.trim()) {
                    body.cover_url = this.cover_url.trim();
                }
                await api('/mangas', {
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                Alpine.store('notifications').add('Manga creado', 'success');
                Alpine.store('route').navigate('dashboard');
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            }
        },

        cancel() {
            Alpine.store('route').navigate('dashboard');
        }
    };
}
