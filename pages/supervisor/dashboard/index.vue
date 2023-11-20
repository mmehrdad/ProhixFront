<template>
    <div>
        <v-row>
            <v-col cols="12" md="3" lg="3">
                <v-card color="#FFF59D" theme="dark">
                    <v-card-title class="text-h5">
                        Accepted <v-chip class="ma-2 right" color="primary">
                            12
                        </v-chip>
                    </v-card-title>

                    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and
                        offline.</v-card-subtitle>


                </v-card>
            </v-col>
            <v-col cols="12" md="3" lg="3">
                <v-card color="#CCFF90" theme="dark">
                    <v-card-title class="text-h5">
                        Read
                    </v-card-title>

                    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and
                        offline.</v-card-subtitle>


                </v-card>
            </v-col>
            <v-col cols="12" md="3" lg="3">
                <v-card color="#CDDC39" theme="dark">
                    <v-card-title class="text-h5">
                        Pending
                    </v-card-title>

                    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and
                        offline.</v-card-subtitle>


                </v-card>
            </v-col>
            <v-col cols="12" md="3" lg="3">
                <v-card color="#CDDC39" theme="dark">
                    <v-card-title class="text-h5">
                        Rejected
                    </v-card-title>

                    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and
                        offline.</v-card-subtitle>


                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { POSITION } from "vue-toastification";
export default {
    // 
    layout: 'supervisor',
    methods: {

        logout() {
            this.$toast.error('فرم با موفقیت ثبت شد', {
                position: POSITION.TOP_CENTER,
                duration: 5000,
            })
        }

    }
}
</script>