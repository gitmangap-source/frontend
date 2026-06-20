document.addEventListener('alpine:init', () => {
    Alpine.store('route', {
        component: 'login',
        params: {},

        navigate(name, params = {}) {
            this.component = name;
            this.params = params;
            location.hash = this.getHash(name, params);
        },

        getHash(name, params) {
            const paths = {
                login: '/',
                register: '/register',
                dashboard: '/dashboard',
                mangaCreate: '/manga/create',
                mangaDetail: '/manga/detail',
                chapterCreate: '/chapter/create',
                reader: '/reader'
            };
            let path = paths[name] || '/';
            const searchParams = new URLSearchParams();
            if (name === 'mangaDetail' && params.id) searchParams.set('id', params.id);
            if (name === 'chapterCreate' && params.manga_id) searchParams.set('manga_id', params.manga_id);
            if (name === 'reader' && params.chapter_id) searchParams.set('chapter_id', params.chapter_id);
            if (name === 'reader' && params.manga_id) searchParams.set('manga_id', params.manga_id);
            const qs = searchParams.toString();
            if (qs) path += '?' + qs;
            return path;
        },

        parseHash(hash) {
            const clean = hash.replace(/^#/, '') || '/';
            const [pathPart, qsPart] = clean.split('?');
            const params = new URLSearchParams(qsPart || '');

            if (pathPart === '/' || pathPart === '/login') return { component: 'login', params: {} };
            if (pathPart.startsWith('/register')) return { component: 'register', params: {} };
            if (pathPart.startsWith('/dashboard')) return { component: 'dashboard', params: {} };
            if (pathPart.startsWith('/manga/create')) return { component: 'mangaCreate', params: {} };
            if (pathPart.startsWith('/manga/detail')) return { component: 'mangaDetail', params: { id: params.get('id') } };
            if (pathPart.startsWith('/chapter/create')) return { component: 'chapterCreate', params: { manga_id: params.get('manga_id') } };
            if (pathPart.startsWith('/reader')) return { component: 'reader', params: { chapter_id: params.get('chapter_id'), manga_id: params.get('manga_id') } };
            return { component: 'notFound', params: {} };
        }
    });

    window.addEventListener('hashchange', () => {
        const parsed = Alpine.store('route').parseHash(location.hash);
        Alpine.store('route').component = parsed.component;
        Alpine.store('route').params = parsed.params;
    });
});
