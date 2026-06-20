function chapterCreatePage() {
    return {
        number: '',
        title: '',
        pages: [''],

        get mangaId() {
            return Alpine.store('route').params.manga_id;
        },

        async save() {
            if (!this.number) {
                Alpine.store('notifications').add('El número de capítulo es obligatorio', 'error');
                return;
            }
            if (!this.mangaId) {
                Alpine.store('notifications').add('ID de manga no especificado', 'error');
                Alpine.store('route').navigate('dashboard');
                return;
            }
            try {
                const chapter = await api('/chapters/manga/' + this.mangaId, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.title || 'Capítulo ' + this.number,
                        chapter_number: parseInt(this.number)
                    })
                });
                const pagesToSend = this.pages
                    .filter(p => p.trim() !== '')
                    .map((url, index) => ({
                        image_url: url,
                        page_number: index + 1
                    }));
                if (pagesToSend.length > 0) {
                    await api('/chapters/' + chapter.id + '/pages', {
                        method: 'POST',
                        body: JSON.stringify(pagesToSend)
                    });
                }
                Alpine.store('notifications').add('Capítulo creado', 'success');
                Alpine.store('route').navigate('mangaDetail', { id: this.mangaId });
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            }
        },

        addPage() {
            this.pages.push('');
        },

        removePage(index) {
            if (this.pages.length > 1) {
                this.pages.splice(index, 1);
            }
        },

        cancel() {
            if (this.mangaId) {
                Alpine.store('route').navigate('mangaDetail', { id: this.mangaId });
            } else {
                Alpine.store('route').navigate('dashboard');
            }
        }
    };
}
