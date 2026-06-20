function loginPage() {
    return {
        email: '',
        password: '',

        async login() {
            if (!this.email || !this.password) {
                Alpine.store('notifications').add('Completa todos los campos', 'error');
                return;
            }
            try {
                await Alpine.store('auth').login(this.email, this.password);
            } catch (e) {
                Alpine.store('notifications').add(e.message, 'error');
            }
        },

        goToRegister() {
            Alpine.store('route').navigate('register');
        }
    };
}
