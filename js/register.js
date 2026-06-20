function registerPage() {
    return {
        username: '',
        email: '',
        password: '',

        async register() {
            if (!this.username || !this.email || !this.password) {
                Alpine.store('notifications').add('Completa todos los campos', 'error');
                return;
            }
            try {
                await api('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                });
                Alpine.store('notifications').add('Cuenta creada. Inicia sesión.', 'success');
                Alpine.store('route').navigate('login');
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            }
        },

        goToLogin() {
            Alpine.store('route').navigate('login');
        }
    };
}
