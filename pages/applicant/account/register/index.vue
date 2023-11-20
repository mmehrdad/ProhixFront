<template>
    <v-row class="wrapper">
        <v-col class="center" cols="12" md="8" lg="8">
            <v-form ref="form">
                <v-card>
                    <v-row>
                        <v-col cols="12" md="6" sm="6" lg="6">

                            <img height="100%" width="100%" style="object-fit: fill" src="~/assets/login.png" />
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="px-16" cols="12" md="6" sm="6" lg="6">
                            <v-row>
                                <v-col md="12" style="text-align:center;" class="mt-10">
                                    <h4>Applicant</h4>
                                </v-col>
                                <v-col md="12" style="text-align:center;" class="my-10">
                                    <h3>Welcome to ProHix</h3>
                                </v-col>
                                <v-col md="12">
                                    <v-text-field v-model="registerData.email" color="primary" label="Email"
                                        variant="underlined" :rules="this.$validator.emailRule"></v-text-field></v-col>
                                <v-col md="12">
                                    <v-text-field type="password" v-model="registerData.password" color="primary" label="Password"
                                        variant="underlined" :rules="this.$validator.normalRules"></v-text-field></v-col>

                                <v-col md="12">
                                    <v-text-field type="password" v-model="confirmPassword" color="primary" label="Confirm Password"
                                        variant="underlined" :rules="this.$validator.normalRules"></v-text-field></v-col>

                                <v-col md="12">
                                    <a style="float: right;font-size: 12px;">Forgot password?</a>
                                </v-col>
                                <v-col md="12" style="text-align: center;">
                                    <v-btn :loading="loading" color="blue-darken-4" @click="confirmEmail()"
                                        class="px-10 text-none primary">Register</v-btn>
                                </v-col>
                                <!-- <v-col md="8" offset-md="2" style="text-align: center;"><v-divider></v-divider></v-col> -->
                                <v-col class="my-6" md="12" style="font-size: 14px;">
                                    <span>Have an account? &nbsp;</span><a href="./login"> Login</a>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-col>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    Email confirmation
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="confirmCode" color="primary" label="Confirm code"
                        variant="underlined"></v-text-field>
                    <v-btn  color="blue-darken-4" @click="register()" class="px-10 text-none text-white">Register</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'ApplicantRegister',
    data() {
        return {
            dialog: false,
            confirmCode: 0,
            loading: false,
            code: 0,
            confirmPassword: '',
            emailConfig: {
                email: '',
                subject: '',
                body: ''
            },
            postApiOption: {
                path: '',
                option: {},
            },
            registerData: {
                email: '',
                password: '',
                createdTime: '',
                isRemoved: false,
                isActive: false
            }
        }
    },
    methods: {
        ...mapActions({
            runPostApi: 'runApi/postApi',
            runGetApi: 'runApi/getApi',
        }),
        async confirmEmail() {
           
            if (!this.$refs.form.validate()) {
                return
            }
            if(this.registerData.password!==this.confirmPassword){
                this.$notifier.showMessage({ content: 'Password and Confirm Password are difference !', color: 'error' });
                return
            }
            
            this.loading=true;
            this.confirmCode='';
            this.code = this.$notifier.generateOtp(5);

            this.emailConfig.email = this.registerData.email;
            this.emailConfig.subject = 'Prohix email confirm'

            this.emailConfig.body = `<table width="640" cellspacing="20px" cellpadding="16px" border="0" align="center" style="max-width:640px;width:100%;background-color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;border:1px solid #eaeaea;border-radius:5px;padding:1.5em">
                <tbody> <tr>
                    <td align="center" valign="top" style="padding:10px">
                        <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px;width:100%">
                            <tbody><tr>
                                <td align="center" valign="top" style="padding:10px">
                                    <img src="http://localhost:3000/assets/prohix.png" style="height:45px;width:45px;margin-bottom:.5em" class="CToWUd" data-bit="iit">
                                        <h1>Verify it's you!</h1>
                                </td>
                            </tr>
                                <tr>
                                </tr><tr>
                                    <td align="left" valign="top" style="padding:10px">
                                        Hi!
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" style="padding:10px">
                                        You are one step away from signing in to <b>ProHix</b>. To finish the registration process, use the following code:
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" style="padding:10px">
                                        <p style="width:100%;background-color:#f9f9f9;border-spacing:2px;color:black;font-size:1em;font-size:16px;font-weight:bold;padding:1em 0">
                                            ${this.code}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" style="padding:10px">
                                        <p style="color:grey;font-size:12px">
                                            This code is valid for one hour but you can request another via the Prohix.com. If you didn't request a verification code or you have any questions please <a href="mailto:info@prohix.com" style="color:#4ad187" target="_blank">contact us</a>.
                                        </p>
                                    </td>
                                </tr>
                            </tbody></table>
                    </td>
                </tr>
            </tbody ></table > `;
            this.postApiOption.path = 'Common/sendEmail'
            this.postApiOption.option = this.emailConfig
            await this.runPostApi(this.postApiOption).then((data) => {
                
                this.loading = false;
                this.dialog = true
            })
        },
        async register() {
            this.dialog=false;
            if (this.confirmCode === this.code) {
                 console.log("registerrrrrrrrrrr")
                this.registerData.createdTime=new Date();
                this.postApiOption.path = 'Student/Register'
                this.postApiOption.option = this.registerData
                await this.runPostApi(this.postApiOption).then((data) => {
                    console.log(data)
                    if(data.hasError){
                        this.$notifier.showMessage({ content: data.message, color: 'error' });
                    }
                    this.loading = false;
                })
            }
            else{
                this.$notifier.showMessage({ content: 'Confirm code not valid !', color: 'error' });
            }
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
    display: flex;
    /* Enable flexbox layout */
    align-items: center;
    /* Center items vertically */
    height: 100vh;
    /* Set the height of the wrapper element */
}
</style>