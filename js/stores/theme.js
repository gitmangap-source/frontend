document.addEventListener('alpine:init', () => {
    Alpine.store('theme', {
        dark: true,

        init() {
            const saved = localStorage.getItem('dark');
            if (saved !== null) {
                this.dark = saved === 'true';
            } else {
                this.dark = true;
                localStorage.setItem('dark', 'true');
            }
            this.apply();
        },

        toggle() {
            this.dark = !this.dark;
            localStorage.setItem('dark', String(this.dark));
            this.apply();
        },

        apply() {
            document.documentElement.classList.toggle('dark', this.dark);
        }
    });
});
