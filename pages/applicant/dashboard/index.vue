<template>
    <div>
        <v-row>
            <v-col md="3" cols="12">
                <div class="small-box success">
                    <div style="color:white" class="pa-4">
                        <div class="text-h3 ">120</div>
                        <p>Proposals</p>
                    </div>
                    <v-icon class="icon">mdi-account-tie-voice</v-icon>
                    <a href="https://www.free-css.com/free-css-templates" class="small-box-footer">More info <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </v-col>
            <v-col md="3" cols="12">
                <div class="small-box primary">
                    <div style="color:white" class="pa-4">
                        <div class="text-h3 ">53</div>
                        <p>Read proposals</p>
                    </div>
                    <v-icon class="icon">mdi-account-tie-voice</v-icon>
                    <a href="https://www.free-css.com/free-css-templates" class="small-box-footer">More info <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </v-col>
            <v-col md="3" cols="12">
                <div class="small-box warning">
                    <div style="color:white" class="pa-4">
                        <div class="text-h3">10</div>
                        <p>Accept</p>
                    </div>
                    <v-icon class="icon">mdi-account-tie-voice</v-icon>
                    <a href="https://www.free-css.com/free-css-templates" class="small-box-footer">More info <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </v-col>
            <v-col md="3" cols="12">
                <div class="small-box error">
                    <div style="color:white" class="pa-4">
                        <div class="text-h3 ">53</div>
                        <p>Reject</p>
                    </div>
                    <v-icon class="icon">mdi-account-tie-voice</v-icon>
                    <a href="https://www.free-css.com/free-css-templates" class="small-box-footer">More info <i
                            class="fa fa-arrow-circle-right"></i></a>
                </div>
            </v-col>
        </v-row>
        <v-card style="margin-top: 20px;">
            <v-card-title>
                <h3> Personal information</h3> &nbsp;

                <v-btn plain class="btn" color="blue darken-2" text @click="editStudent()"> Edit </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row style="margin-bottom:15px">
                    <v-col cols="12" md="4">
                        <v-divider style="margin-bottom:15px"></v-divider>
                        <v-row>
                            <v-col md="3" cols="3">
                                First name:
                            </v-col>
                            <v-col md="6" cols="9">
                                <v-text-field :disabled="true" :value="student.firstName"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="3" cols="3">
                                Middle name:
                            </v-col>
                            <v-col md="6" cols="9">
                                <v-text-field :disabled="true" :value="student.middleName"></v-text-field>

                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="3" cols="3">
                                Surname:
                            </v-col>
                            <v-col md="6" cols="9">
                                <v-text-field :disabled="true" :value="student.surname"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="3" cols="3">
                                Date of birth:
                            </v-col>
                            <v-col md="6" cols="9">
                                <v-text-field :disabled="true" :value="student.dateOfBirth"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="3" cols="3">
                                Citizenship:
                            </v-col>
                            <v-col md="6" cols="9">

                                <v-text-field v-if="citizenship" :disabled="true" :value="citizenship.name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="3" cols="3">
                                Gender:
                            </v-col>
                            <v-col md="6" cols="9">

                                <v-text-field v-if="student.gender" :disabled="true"
                                    :value="student.gender | gender"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="6" style="margin-top:15px">
                        <v-row>
                            <v-col md="2" cols="3">
                                Postal code:
                            </v-col>
                            <v-col md="3" cols="9">
                                <v-text-field :disabled="true" :value="student.postalCode"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="2" cols="3">
                                Address:
                            </v-col>
                            <v-col md="3" cols="9">
                                <v-text-field :disabled="true" :value="student.address"></v-text-field>

                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
        <v-dialog v-model="dialog" max-width="900px">

            <v-form ref="form">
                <v-card>
                    <v-card-title>
                        <span class="text-h5"> Edit applicant info </span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field v-model="studentTemp.firstName" label="First name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field v-model="studentTemp.middleName" label="Middle name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field v-model="studentTemp.surname" label="Surname"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <DatePicker label="Date of birth" v-model="studentTemp.dateOfBirth"
                                        :rules="this.$validator.normalRules">
                                    </DatePicker>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-autocomplete itemText="name" :returnObject="true" itemValue="id" :multiple="false"
                                        :items="countries" v-model="citizenship" :rules="this.$validator.normalRules"
                                        label="Citizenship"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-autocomplete itemText="name" :returnObject="true" itemValue="id" :multiple="false"
                                        :items="countries" v-model="secondCitizenship" :rules="this.$validator.normalRules"
                                        label="Second Citizenship"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="6" sm="6" lg="6">
                                    <v-row>
                                        <v-col cols="12" sm="3" md="3" lg="3">
                                            Gender
                                        </v-col>
                                        <v-col cols="12" sm="9" md="9" lg="9">
                                            <v-radio-group v-model="student.gender" row>
                                                <v-radio label="Man" :value="1" color="rgb(20, 48, 84)"></v-radio>
                                                <v-radio label="Woman" :value="2" color="rgb(20, 48, 84)"></v-radio>
                                                <v-radio label="Other" :value="3" color="rgb(20, 48, 84)"></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-autocomplete v-model="studentTemp.motherTongueId"
                                        :rules="this.$validator.normalRules" itemValue="id" itemText="name"
                                        :items="languages" label="Mother tongue"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field v-model="studentTemp.postalCode" label="Postal code"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-text-field v-model="studentTemp.address" :rules="this.$validator.normalRules"
                                        label="Address"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { POSITION } from "vue-toastification";
import { mapActions } from 'vuex'
export default {
    // 
    layout: 'applicant',
    data: () => ({

        studentId: '',
        getApiPath: '',
        dialog: false,
        student: {
            id: '',
            firstName: '',
            middleName: '',
            surname: '',
            citizenshipId: 0,
            secondCitizenshipId: 0,
            motherTongueId: 0,
            dateOfBirth: '',
            postalCode: '',
            address: '',
        },
        studentTemp: {
            id: '',
            firstName: '',
            middleName: '',
            surname: '',
            citizenshipId: 0,
            secondCitizenshipId: 0,
            motherTongueId: 0,
            dateOfBirth: '',
            postalCode: '',
            address: '',
        },
        citizenship: {},
        secondCitizenship: {},
        motherTongue: {},


        countries: [],
        languages: [],
        postApiOption: {
            path: '',
            option: {},
        },

    }),
    methods: {
        ...mapActions({
            runPostApi: 'runApi/postApi',
            runGetApi: 'runApi/getApi',
            runPutApi: 'runApi/putApi',
            getUserInfo: 'getUserInfo',
        }),
        async getInformation() {
            this.getApiPath = `student/GetStudentById/${this.studentId}`

            await this.runGetApi(this.getApiPath).then((data) => {
                this.student = data;
                this.citizenship = data.citizenship;
                this.secondCitizenship = data.secondCitizenship;
                this.student.dateOfBirth = (this.student.dateOfBirth.split('T')[0]);
            })
        },
        logout() {
            this.$toast.error('فرم با موفقیت ثبت شد', {
                position: POSITION.TOP_CENTER,
                duration: 5000,
            })
        },
        async getCountries() {

            this.getApiPath = `common/GetCountry`

            await this.runGetApi(this.getApiPath).then((data) => {
                this.countries = data
            })

        },
        async getLanguages() {

            this.getApiPath = `common/GetLanguage`

            await this.runGetApi(this.getApiPath).then((data) => {
                this.languages = data
            })

        },
        editStudent() {
            this.studentTemp ={ ...this.student};
            this.dialog = true;
        },
        async save() {
            this.student ={ ...this.studentTemp};
            this.student.citizenshipId =this.citizenship? this.citizenship.id:null;
            this.student.secondCitizenshipId =this.secondCitizenship? this.secondCitizenship.id:null;
            this.student.dateOfBirth = (this.dateOfBirth?this.student.dateOfBirth.split('T')[0]:null);
            this.postApiOption.path = 'Student/updateStudent'
            this.postApiOption.option = await this.student
            await this.runPutApi(this.postApiOption).then((data) => {
                this.loading = false;
                this.dialog = false
            })

        }
    },
    async created() {
        const userInfo = await this.getUserInfo()
        this.studentId = userInfo.StudentId;
        this.getInformation();
        this.getCountries();
        this.getLanguages();
    }
}
</script>
<style >
.theme--light .v-input--is-disabled input {
    color: rgb(0, 0, 0) !important;
    /* border-bottom: 1px solid rgb(74, 73, 73); */
}

.small-box .icon {
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 0;
    font-size: 90px;
    color: rgba(0, 0, 0, 0.15);
}

.small-box>.small-box-footer {
    position: relative;
    text-align: center;
    padding: 3px 0;
    color: #fff;
    color: rgba(255, 255, 255, 0.8);
    display: block;
    z-index: 10;
    background: rgba(0, 0, 0, 0.1);
    text-decoration: none;
}

.small-box {
    border-radius: 2px;
    position: relative;
    display: block;
    /* margin-bottom: 20px; */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.btn {
    text-transform: unset !important;
}
</style>

        