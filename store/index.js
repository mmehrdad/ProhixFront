import VueJwtDecode from 'vue-jwt-decode';

export const actions = {


    showSnackbar(state, option) {

        this.$notifier.showMessage(option)

    },
    async getUserInfo({ dispatch }) {
        try {
            const token = await dispatch('getToken');
            const userinfo = VueJwtDecode.decode(token);


            return userinfo;
        }
        catch {
            this.$router.push("/account/login");
        }

    },
    async getToken() {

        let token = await localStorage.getItem("userToken");
        if (token) {
            token = token.replace('"', '');
            token = token.replace('"', '');
        }
        return token;
    },

}