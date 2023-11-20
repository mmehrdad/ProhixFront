<template>
    <v-row class="wrapper">

        <v-col class="center" cols="12" md="7" lg="7">
            <v-form ref="form">
                <v-card>
                    <v-row>
                        <v-col cols="12" md="6" sm="6" lg="6">

                            <!-- <img height="100%" width="100%" style="object-fit: fill" src="~/assets/login.png" /> -->
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="px-16" cols="12" md="6" sm="6" lg="6">
                            <v-row>
                                <v-col cols="12" md="12" style="text-align:center;" class="mt-10">
                                    <h4>Applicant</h4>
                                </v-col>
                                <v-col cols="12" md="12" style="text-align:center;" class="my-10">
                                    <h3>Welcome to ProHix</h3>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="loginModel.username"  label="Email"
                                         :rules="this.$validator.emailRule"></v-text-field></v-col>
                                <v-col cols="12" md="12">
                                    <v-text-field type="password" v-model="loginModel.password" 
                                        label="Password" variant="underlined"
                                        :rules="this.$validator.normalRules"></v-text-field></v-col>

                                <v-col cols="12" md="12">
                                    <a style="float: right;font-size: 12px;">Forgot password?</a>
                                </v-col>
                                <v-col cols="12" md="12" style="text-align: center;">
                                    <v-btn color="blue-darken-4" @click="login()" :loading="loading"
                                        class="px-10  text-none primary">Sign in</v-btn>
                                </v-col>
                                <!-- <v-col md="8" offset-md="2" style="text-align: center;"><v-divider></v-divider></v-col> -->
                                <v-col class="my-6" md="12" style="font-size: 14px;">
                                    <!-- <span>New applicant? &nbsp;</span> -->
                                    <a href="./register"> Home</a><a style="float: right;font-size: 12px" href="./register">
                                        Create account</a><span style="float: right;;font-size: 12px">New applicant?
                                        &nbsp;</span>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-col>

    </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'ApplicantLogin',
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            loading: false,
            loginModel: {
                username: '',
                password: ''
            },
            postApiOption: {
                path: '',
                option: {},
            },
        }
    },
    methods: {
        ...mapActions({
            runPostApi: 'runApi/postApi',
            runGetApi: 'runApi/getApi',

        }),
        async login() {
            if (!this.$refs.form.validate()) {
                return
            }
            this.loading = true;
            this.postApiOption.path = "student/login";
            this.postApiOption.option = this.loginModel;
            await this.runPostApi(this.postApiOption).then((data) => {
                if (data.hasError === false) {
                    localStorage.setItem('userToken', JSON.stringify(data.token));
                    this.loading = false;
                    this.$router.push({ path: '/Applicant/Dashboard' })

                }
                else {
                    this.loading = false;
                    this.$notifier.showMessage({ content: data.message, color: 'error' })
                }
            })
        }
    }
}
</script>
<style>
.center {
    width: 50%;
    /* Set the width of the div */
    margin: 0 auto;
    /* Center the div horizontally */
}
.wrapper {
  display: flex; /* Enable flexbox layout */
  align-items: center; /* Center items vertically */
  height: 100vh; /* Set the height of the wrapper element */
}
</style>