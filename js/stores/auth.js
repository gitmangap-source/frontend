document.addEventListener('alpine:init', () => {
    Alpine.store('auth', {
        token: localStorage.getItem('token') || null,
        user: null,

        init() {
            if (this.token) {
                try {
                    const payload = JSON.parse(atob(this.token.split('.')[1]));
                    this.user = payload;
                } catch {
                    this.token = null;
                    localStorage.removeItem('token');
                }
            }
        },

        async login(email, password) {
            const result = await api('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            this.token = result.access_token;
            localStorage.setItem('token', result.access_token);
            try {
                this.user = JSON.parse(atob(this.token.split('.')[1]));
            } catch {}
            Alpine.store('route').navigate('dashboard');
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            Alpine.store('route').navigate('login');
        },

        get isAuthenticated() {
            return !!this.token;
        }
    });
});
