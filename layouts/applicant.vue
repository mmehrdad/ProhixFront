<template>
    <v-app light>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12" lg="12" class="">
                    <v-card color="grey lighten-4" flat>
                        <v-toolbar>
                            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                            <v-toolbar-title>Title</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>

                            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>


                                <v-card>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-avatar>
                                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title>John Leider</v-list-item-title>
                                                <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
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

                                        <v-btn text @click="menu = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="primary" text @click="logout">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </v-toolbar>

                    </v-card>
                </v-col>
                <!-- ------------------------------------------------ -->
                <div class="display-area">
                    <div class="cards-wrapper">

                        <div class="card"><img src="https://picsum.photos/200?random=1" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=2" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=3" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=4" alt=""></div>

                        <div class="card"><img src="https://picsum.photos/200?random=5" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=6" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=7" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=8" alt=""></div>

                        <div class="card"><img src="https://picsum.photos/200?random=9" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=10" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=11" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=12" alt=""></div>

                        <div class="card"><img src="https://picsum.photos/200?random=13" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=14" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=15" alt=""></div>
                        <div class="card"><img src="https://picsum.photos/200?random=16" alt=""></div>
                    </div>
                </div>

                <!-- <div class="dots-wrapper">
                    <button class="dot active"></button>
                    <button class="dot"></button>
                    <button class="dot"></button>
                    <button class="dot"></button>
                </div> -->
                <!-- ------------------------------ movabale ----------------------- -->
                <!-- <div id="slider">
                    <div class="slider">
                        <ul class="slides" :style="{ left: -width * current + 'px' }">
                            <li v-for="(slide,i) in slides " :key="i">
                                <img :src="slide" alt="">
                            </li>
                        </ul>
                        <ul class="bullets">
                            <li v-for="(slide, i) in slides" :key=" i " @click="selectSlide(i)"
                                v-html="i == current ? '&#9679;' : '&omicron;'"></li>
                        </ul>
                        <a class="prev" href="#" @click.prevent="prevSlide">&#x25C0;</a>
                        <a class="next" href="#" @click.prevent="nextSlide">&#x25B6;</a>
                    </div>
                </div> -->
                
                <!-- ------------------------------------------------ -->
                <v-col cols="12" sm="12" md="2" lg="2" class=" mr-5">
                    <v-navigation-drawer v-model="drawer" absolute temporary>
                        <v-list color="white" class="mx-auto" width="100%" style="float: left;">
                            <v-list-item>
                                <img src="../assets/prohix.png" height="50" />
                            </v-list-item>
                            <v-list-item>
                                <v-divider></v-divider>
                            </v-list-item>
                            <v-list-item>
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

                                <v-list-item-title>
                                    Educations

                                </v-list-item-title>
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


        // -----------------------------
        slides: [
            'https://picsum.photos/200?random=9',
            'https://picsum.photos/200?random=10',
            'https://picsum.photos/200?random=11',
            'https://picsum.photos/200?random=12',
            'https://picsum.photos/200?random=13',
            'https://picsum.photos/200?random=9',
            'https://picsum.photos/200?random=10',
            'https://picsum.photos/200?random=11',
            'https://picsum.photos/200?random=12',
            'https://picsum.photos/200?random=13',
        ],
        current: 0,
        width: 300,
        timer: 0,

        // ------------------------------
    }),
    middleware: 'CheckApplicantauth',
    methods: {
        logout() {
            console.log('')
        },
       ...mapActions({
            runPostApi: 'runapi/postApi',
            runGetApi: 'runapi/getApi',
            runPutApi: 'runapi/putApi',
        }),
        // -------------------------------------------
        
        // -------------------------------------------

    },
    created() {
        // this.play();
    },
    head: {
        script: [
            {
                src: '/script.js',
            },
            {
                src: "/splide.min.js"

            }
        ],


    }
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

/* #slider{
width:100%;
}

.slider {
  margin: 0 auto;
  padding: 0;
  margin-left: 15px;
  margin-right: 15px;
  max-width: 100%;
  height: 150px;
  position: relative;
  overflow: hidden;
  ul.slides {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: table;
    position: absolute;
    top: 0;
    transition: left 800ms;
    li {
      list-style-type: none;
      display: table-cell;
      img{
        width: 300;
      }
    }
  }
  ul.bullets {
    width: inherit;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0 0 10px 0;
    text-align: center;
    z-index: 1;    
    li {
      list-style-type: none;
      display: inline;
      color: #fff;
      cursor: pointer;
      padding: 0 5px;      
      font-size: 20px;      
      font-family: sans-serif;          
    }
  }  
  .prev,
  .next{
    text-decoration: none;
    color: #fff;
    position: absolute;  
    z-index: 1;
    font-size: 18px;
    top: 43%;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  }
  .prev{
    left: 20px;
  }
  .next{
    right: 20px;
  }
}   */

</style>