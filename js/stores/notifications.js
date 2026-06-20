document.addEventListener('alpine:init', () => {
    Alpine.store('notifications', {
        items: [],

        add(message, type = 'success') {
            const id = Date.now() + Math.random();
            this.items.push({ id, message, type });
            setTimeout(() => this.remove(id), 3500);
        },

        remove(id) {
            this.items = this.items.filter(n => n.id !== id);
        }
    });
});
