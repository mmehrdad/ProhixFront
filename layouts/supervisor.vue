<template>
    <v-app light>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="12" lg="12" class="">
                    <v-card color="grey lighten-4" flat>
                        <v-toolbar>
                            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                            <v-toolbar-title>Supervisor</v-toolbar-title>
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
                <v-col cols="12" sm="12" md="2" lg="2" class="my-4 mr-5">
                    <v-navigation-drawer v-model="drawer" absolute temporary>
                        <v-list color="grey lighten-4" class="mx-auto" width="100%" style="float: left;">
                            <v-list-item>
                                ProHix
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

                                <v-list-item-title>Jobs</v-list-item-title>
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

            <Nuxt />
        </v-container>
    </v-app>
</template>
<script>
export default {
    name: 'Supervisor',
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
    }),
    methods: {
        logout() {
            console.log('')
        }
    }
}
</script>
