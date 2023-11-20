<template>
  <div>

    <MccDataTable v-if="valid" :showFilter="false" :fieldsInfo="headers" :tableItems="educations" sort-by="calories"
      class="elevation-1" :special-cols="specialColsSlotsName">

      <template #[`item.actions`]="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon> -->
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getEducations()">
          Reset
        </v-btn>
      </template>
      <template #[`item.fromDate`]="{ item }">
        <span class="text-no-wrap">
          {{ item['fromDate'] | dateWithoutTime }}
        </span>
      </template>
      <template #[`item.toDate`]="{ item }">
        <span class="text-no-wrap">
          {{ item['toDate'] | dateWithoutTime }}
        </span>
      </template>
      <template #title> Educations </template>
      <template #add-template>
        <v-btn color="success" @click="addEducation()">
          <v-icon dense left>mdi-plus</v-icon>
          New Education
        </v-btn>
      </template>



    </MccDataTable>
    <v-dialog v-model="dialog" max-width="900px">
      
      <v-form ref="form" v-if="valid">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }} </span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-autocomplete itemText="name" :returnObject="true" itemValue="id" :multiple="false"
                    @change="getUniversities()" :items="countries" v-model="country" :rules="this.$validator.normalRules"
                    label="Country"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-autocomplete v-if="universities" v-model="education.universityId" itemValue="id" itemText="name"
                    :items="universities" label="University"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-checkbox v-model="isInList" label="Educational institution is not in the list"></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="universityName" :disabled="!isInList" label="University Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-autocomplete v-model="education.fieldOfStudyId" :rules="this.$validator.normalRules" itemValue="id"
                    itemText="name" :items="fieldOfStudies" label="Field of study"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-autocomplete v-model="education.gradeOfStudyId" :rules="this.$validator.normalRules" itemValue="id"
                    itemText="name" :items="gradeOfStudies" label="Qualification"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-text-field v-model="education.average" :rules="this.$validator.normalRules"
                    label="Average"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <DatePicker label="From date" v-model="education.fromDate" :rules="this.$validator.normalRules">
                  </DatePicker>
                  <!-- <v-date-picker v-model="education.fromDate"></v-date-picker> -->
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <DatePicker label="To date" v-model="education.toDate" :rules="this.$validator.normalRules">
                  </DatePicker>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="save()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">Are you sure you want to delete this item?</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="ma-5">
            <v-col md="4" cols="12">{{ gradeOfStudy.name }}</v-col>
            <v-col md="4" cols="12">{{ fieldOfStudy.name }}</v-col>

          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { POSITION } from "vue-toastification";
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  // 
  layout: 'applicant',

  data: () => ({
    specialColsSlotsName: ['item.actions',
      'item.user.userProfile.imageName',
      'item.fromDate',
      'item.toDate',],
    valid: false,
    isInList: false,
    formTitle: '',
    universityName: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Grade of study',
        align: 'start',
        sortable: false,
        value: 'gradeOfStudy.name',
      },
      { text: 'Field of study', value: 'fieldOfStudy.name' },
      { text: 'Country', value: 'country.name' },
      { text: 'University', value: 'university.name' },
      { text: 'Average', value: 'average' },
      { text: 'Start', value: 'fromDate', sortable: false },
      { text: 'End', value: 'toDate', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    educations: [],
    education: {
      id: 0,
      gradeOfStudyId: 0,
      universityId: 0,
      countryId: 0,
      fieldOfStudyId: 0,
      average: 0,
      fromDate: '' | Date,
      toDate: '' | Date,
      StudentId: '',
    },
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    countries: [],
    country: {},
    universities: [],
    fieldOfStudies: [],
    fieldOfStudy: {},
    gradeOfStudies: [],
    gradeOfStudy: {},
    university: {
      name: '',
      countryId: 0,
      isvalid: false,
    },
    studentId: '',
    postApiOption: {
      path: '',
      option: {},
    },
  }),
  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? 'New Education' : 'Edit Item'
    // },

    ...mapState('education', {
      changed: state => state.changed,
    })

  },

  watch: {
    changed(value) {

      if (value) {
        this.getEducations();
        this.reset();
      }
    },
    // dialog(val) {
    //   console.log("hiiiiiiiiiiiiiiiii")
    //   this.getEducations();
    //   val || this.close()
    // },
    // dialogDelete(val) {
    //   val || this.closeDelete()
    // },

  },
  async created() {
    const userInfo = await this.getUserInfo()
    this.studentId = userInfo.StudentId;
    this.getEducations();
    this.getCountries();
    this.getFieldOfStudies();
    this.getGradeOfStudies();
  },
  methods: {
    ...mapActions({
      runPostApi: 'runApi/postApi',
      runGetApi: 'runApi/getApi',
      runPutApi: 'runApi/putApi',
      getUserInfo: 'getUserInfo',
    }),
    ...mapMutations({
      dataChanged: 'education/dataChanged',
      reset: 'education/reset'
    }),
    logout() {
      this.$toast.error('فرم با موفقیت ثبت شد', {
        position: POSITION.TOP_CENTER,
        duration: 5000,
      })
    },
    async getUniversities() {

      const apiPath = `common/GetUniversity/${this.country.id}`

      await this.runGetApi(apiPath).then((data) => {
        this.universities = data
      })

    },
    async getCountries() {

      this.getApiPath = `common/GetCountry`

      this.cityLoading = true;
      await this.runGetApi(this.getApiPath).then((data) => {
        this.countries = data
      })

    },
    async getFieldOfStudies() {

      this.getApiPath = `common/GetFieldOfstudy`

      this.cityLoading = true;
      await this.runGetApi(this.getApiPath).then((data) => {
        this.fieldOfStudies = data
      })

    },
    async getGradeOfStudies() {

      this.getApiPath = `common/GetGradeOfstudy`
      this.cityLoading = true;
      await this.runGetApi(this.getApiPath).then((data) => {
        this.gradeOfStudies = data
      })

    },
    async getEducations() {

      this.getApiPath = `Student/GetEducation/${this.studentId}`
      await this.runGetApi(this.getApiPath).then((data) => {

        this.loading = false;
        this.educations = data;
        this.valid = true;
      })

    },

    editItem(item) {
      this.editedIndex = this.educations.indexOf(item)
      this.education = Object.assign({}, item)
      this.country = item.country;
      this.getUniversities();
      this.dialog = true
    },

    deleteItem(item) {

      this.education.id = item.id;
      this.fieldOfStudy = item.fieldOfStudy;
      this.gradeOfStudy = item.gradeOfStudy;
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.getApiPath = `Student/DeleteEducation/${this.education.id}`
      await this.runGetApi(this.getApiPath).then((data) => {

        this.loading = false;
        this.valid = true;
        this.dataChanged();
        this.closeDelete()
      })

    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    addEducation() {
      this.education = {};
      this.dialog = true;
    },
    async save() {
      if (!this.$refs.form.validate()) {
        return window.scroll({
          top: 0,
          behavior: 'smooth',
        })
      }
      if (this.universityName !== '') {
        this.university.name = this.universityName;
        this.university.isvalid = false;
        this.university.countryId = this.country.id;
        this.postApiOption.option = this.university;
        this.postApiOption.path = 'Common/AddUniversity'
        await this.runPostApi(this.postApiOption).then((data) => {
          this.loading = false;
          this.education.universityId = data.id;
        })
      }

      this.education.StudentId = this.studentId;
      this.education.countryId = this.country.id;
      this.postApiOption.option = this.education
      this.postApiOption.path = 'Student/AddEducation'
      await this.runPostApi(this.postApiOption).then((data) => {
        this.loading = false;
        this.dialog = false
        this.dataChanged();
      })
    },

  },
}
</script>