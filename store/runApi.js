import axios from 'axios'

export const state = () => ({
    loadding: false

})
export const actions = {

    async getApi({ dispatch }, path) {
        const token = await dispatch("getToken", '', { root: true });

        if (token) {
            
            try {
                return await axios.get(`${process.env.baseApiUrl}/${path}`, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then((data) => {
                        return data.data;
                    })
            }
            catch {
                
                this.$notifier.showMessage({ content: 'Check server connection', color: 'error' })
                return { hasError: true, message: '  Check server connection ' }

            }
        }
        else if (path.includes('login')  || path.includes('register') ) {
            try {
                return await axios.get(`${process.env.baseApiUrl}/${path}`)
                    .then((data) => {
                        return data.data;
                    })
            }
            catch {
                this.$notifier.showMessage({ content: 'Check server connection', color: 'error' })
                return { hasError: true, message: 'Check server connection' }
            }
        }
        else {
            this.$router.push("/");
        }

    },
    async postApi({ dispatch }, options) {

        const token = await dispatch("getToken", '', { root: true });
console.log(options.path)
        if (token) {
            // try {
                return await axios.post(`${process.env.baseApiUrl}/${options.path}`, options.option, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then((data) => {
                        this.state.loadding = false;
                        return data.data;
                    })
                    .catch((data) => {
                        return data.data;
                    });


            // }
            // catch {
            //     this.$notifier.showMessage({ content: '   Check server connection', color: 'error' })
            //     return { hasError: true, message: 'Check server connection' }

            // }
        }
        else if (options.path.toLowerCase().includes('login')  || options.path.toLowerCase().includes('register') || options.path.toLowerCase().includes('sendemail')) {
            // try {
                return await axios.post(`${process.env.baseApiUrl}/${options.path}`, options.option)
                    .then((data) => {
                        return data.data;
                    })
                    .catch((data) => {
                        return data;
                    });
            // }
            // catch {
            //     this.$notifier.showMessage({ content: ' Check server connection ', color: 'error' })
            //     return { hasError: true, message: '  Check server connection ' }

            // }
        }
        else {
            this.$router.push("/");
        }

    },
    async putApi({ dispatch }, options) {

        const token = await dispatch("getToken", '', { root: true });
        if (token) {
            try {
                return await axios.put(`${process.env.baseApiUrl}/${options.path}`, options.option, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then((data) => {
                        return data.data;
                    })
            }
            catch {
                this.$notifier.showMessage({ content: ' Check server connection  ', color: 'error' })
                return { hasError: true, message: '  Check server connection ' }

            }
        }
        else if (options.path === "account/login" || options.path === "account/register") {
            try {
                return await axios.put(`${process.env.baseApiUrl}/${options.path}`, options.option)
                    .then((data) => {
                        return data.data;
                    })
            }
            catch {
                this.$notifier.showMessage({ content: ' Check server connection ', color: 'error' })
                return { hasError: true, message: ' Check server connection ' }

            }
        }
        else {
            this.$router.push("/");
        }

    },
    async sendsms({ dispatch }, options) {
        const token = await dispatch("getToken", '', { root: true });
        if (token) {
            try {
                return await axios.put(`${process.env.baseApiUrl}/Sms/SendSms`, options.option, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then((data) => {
                        return data.data;
                    })
            }
            catch {
                this.$notifier.showMessage({ content: 'Check server connection ', color: 'error' })
                return { hasError: true, message: 'Check server connection' }

            }
        }
    }

}