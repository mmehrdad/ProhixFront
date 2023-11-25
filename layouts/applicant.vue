<template>
  <v-app light>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" class="">
          <v-card color="grey lighten-4" flat>
            <v-toolbar>
              <v-app-bar-nav-icon
                @click="drawer = !drawer"
              ></v-app-bar-nav-icon>
              <v-toolbar-title>Applicant dashboard</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <img
                          src="https://cdn.vuetifyjs.com/images/john.jpg"
                          alt="John"
                        />
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ nameFamily }}</v-list-item-title>
                        <v-list-item-subtitle
                          >{{userName}}</v-list-item-subtitle
                        >
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          :class="fav ? 'red--text' : ''"
                          icon
                          @click="fav = !fav"
                        >
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item>
                      <v-list-item-action>
                        <v-switch v-model="message" color="purple"></v-switch>
                      </v-list-item-action>
                      <v-list-item-title>Enable messages</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-action>
                        <v-switch v-model="hints" color="purple"></v-switch>
                      </v-list-item-action>
                      <v-list-item-title>Enable hints</v-list-item-title>
                    </v-list-item>
                  </v-list>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <!-- <v-btn text @click="menu = false"> Cancel </v-btn> -->
                    <v-btn color="primary" text @click="logout()">
                      Logout
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-toolbar>
          </v-card>
        </v-col>
        <!-- ------------------------------------------------ -->
        <v-col cols="12" sm="12" md="12" lg="12" class="">
          <v-carousel hide-delimiters style="height: 300px">
            <v-carousel-item
              v-for="slideIndex in slideIndexes"
              :key="slideIndex"
            >
              <v-row>
                <v-col
                  v-for="slide in getSlidesForIndex(slideIndex)"
                  :key="slide.id"
                  cols="12"
                  sm="12"
                  md="2"
                  lg="2"
                >
                  <!-- Your slide content goes here -->
                  <v-card>
                    <v-img :src="slide.image" height="200"></v-img>
                    <v-card-title>{{ slide.title }}</v-card-title>
                    <v-card-text>{{ slide.description }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <!-- ------------------------------------------------ -->
        <v-col cols="12" sm="12" md="12" lg="12" class="mr-5">
          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list
              color="white"
              class="mx-auto"
              width="100%"
              style="float: left"
            >
              <v-list-item>
                <img src="../assets/prohix.png" height="50" />
              </v-list-item>
              <v-list-item>
                <v-divider></v-divider>
              </v-list-item>
              <v-list-item to="./dashboard">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Personal</v-list-item-title>
              </v-list-item>

              <v-list-item to="./language">
                <v-list-item-icon>
                  <v-icon>mdi-account-tie-voice</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Languages</v-list-item-title>
              </v-list-item>
              <v-list-item to="./education">
                <v-list-item-icon>
                  <v-icon>mdi-account-school</v-icon>
                </v-list-item-icon>

                <v-list-item-title> Educations </v-list-item-title>
              </v-list-item>
              <v-list-item to="./job">
                <v-list-item-icon>
                  <v-icon>mdi-account-cog</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Professions</v-list-item-title>
              </v-list-item>
              <v-list-item to="./proposal">
                <v-list-item-icon>
                  <v-icon>mdi-book-open-page-variant-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Proposals</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
      </v-row>
      <Snackbar></Snackbar>
      <Nuxt />
    </v-container>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Applicant',

  data: () => ({
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
    bars: [
      { class: '' },
      // { class: '', dark: true },
      // { class: 'primary', dark: true },
      // { class: 'elevation-0' },
    ],

    drawer: false,
    fav: true,
    menu: false,
    message: false,
    hints: true,
    nameFamily: '',
    userName: '',
    // -----------------------------
    // slides: [
    //   'https://picsum.photos/200?random=9',
    //   'https://picsum.photos/200?random=10',
    //   'https://picsum.photos/200?random=11',
    //   'https://picsum.photos/200?random=12',
    //   'https://picsum.photos/200?random=13',
    //   'https://picsum.photos/200?random=9',
    //   'https://picsum.photos/200?random=10',
    //   'https://picsum.photos/200?random=11',
    //   'https://picsum.photos/200?random=12',
    //   'https://picsum.photos/200?random=13',
    // ],
    slides: [
      // Your slide objects here
      {
        id: 1,
        image: 'https://picsum.photos/200?random=1',
        title: 'Slide 1',
        description: 'Description for Slide 1',
      },
      {
        id: 2,
        image: 'https://picsum.photos/200?random=2',
        title: 'Slide 2',
        description: 'Description for Slide 2',
      },
      {
        id: 3,
        image: 'https://picsum.photos/200?random=3',
        title: 'Slide 1',
        description: 'Description for Slide 1',
      },
      {
        id: 4,
        image: 'https://picsum.photos/200?random=113',
        title: 'Slide 2',
        description: 'Description for Slide 2',
      },
      {
        id: 5,
        image: 'https://picsum.photos/200?random=123',
        title: 'Slide 1',
        description: 'Description for Slide 1',
      },
      {
        id: 6,
        image: 'https://picsum.photos/200?random=131',
        title: 'Slide 2',
        description: 'Description for Slide 2',
      },
      {
        id: 7,
        image: 'https://picsum.photos/200?random=133',
        title: 'Slide 1',
        description: 'Description for Slide 1',
      },
      {
        id: 8,
        image: 'https://picsum.photos/200?random=143',
        title: 'Slide 2',
        description: 'Description for Slide 2',
      },
      {
        id: 9,
        image: 'https://picsum.photos/200?random=163',
        title: 'Slide 1',
        description: 'Description for Slide 1',
      },
      {
        id: 10,
        image: 'https://picsum.photos/200?random=153',
        title: 'Slide 2',
        description: 'Description for Slide 2',
      },
      {
        id: 11,
        image: 'https://picsum.photos/200?random=183',
        title: 'Slide 1',
        description: 'Description for Slide 1',
      },
      {
        id: 12,
        image: 'https://picsum.photos/200?random=193',
        title: 'Slide 2',
        description: 'Description for Slide 2',
      },
    ],
    slidesPerPage: 6,
    current: 0,
    width: 300,
    timer: 0,

    // ------------------------------
  }),
  middleware: 'CheckApplicantauth',
  computed: {
    slideIndexes() {
      return Math.ceil(this.slides.length / this.slidesPerPage)
    },
  },
  mounted() {
    if (this.$device.windows) this.slidesPerPage = 6
    if (this.$device.mobile) this.slidesPerPage = 1
    console.log(this.$device)
  },
  methods: {
    logout() {
      localStorage.removeItem('userToken')
      // localStorage.removeItem('hs799hr2336q')
      this.$router.push('/Applicant/Account/Login')
    },
    ...mapActions({
      runPostApi: 'runapi/postApi',
      runGetApi: 'runapi/getApi',
      runPutApi: 'runapi/putApi',
    }),
    // -------------------------------------------
    getSlidesForIndex(slideIndex) {
      const startIndex = (slideIndex - 1) * this.slidesPerPage
      const endIndex = startIndex + this.slidesPerPage
      return this.slides.slice(startIndex, endIndex)
    },
    // -------------------------------------------
  },
  created() {
    // this.play();
    this.$store.dispatch('getUserInfo').then((data) => {
      this.nameFamily = data.Name
      this.userName=data.UserName;
      console.log(data)
    })
  },
  head: {
    script: [
      {
        src: '/script.js',
      },
      {
        src: '/splide.min.js',
      },
    ],
  },
}
</script>
<style scoped>
.card {
  height: 150px;

  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 40px;
  margin-left: 10px;
  flex: 150px 0 0;
}

.card img {
  width: 100%;
  object-fit: cover;
  height: 150px !important;
}

.cards-wrapper {
  display: flex;
  transition: ease 0.5s;
}

.display-area {
  width: 100%;
  height: 165px;
  overflow-x: hidden;
  margin: auto;
}

.dots-wrapper {
  display: flex;
  justify-content: center;
  margin: auto;
  margin-bottom: 15px;
}

.dot {
  border: none;
  background: rgba(0, 0, 0, 0.2);
  width: 10px;
  height: 10px;
  margin: 5px;
  border-radius: 50%;
  outline: none;
}

.dot:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dot.active {
  background: rgba(0, 0, 0, 0.5);
}
</style>