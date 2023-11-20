export default ({ app, store }, inject) => {
    inject('notifier', {
        showMessage({ content = '', color = '' }) {
            store.commit('snackbar/showMessage', { content, color })
        },
        generateOtp( size ) {
            const zeros = '0'.repeat(size - 1);
            const x = parseFloat('1' + zeros);
            const y = parseFloat('9' + zeros);
            const confCode = String(Math.floor(x + Math.random() * y));
            return confCode;
        },

    })
}