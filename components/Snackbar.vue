<template>
    <v-snackbar style="padding-bottom: 10px;" v-model="show" :timeout="10000" :color="color" buttom left>
        <div style="padding-top: 5px;padding-bottom: 5px;">
            {{ message }}
            <v-btn text class="snackbar" @click="show = false"> &#215;</v-btn>
        </div>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            name: "Snackbar",
            show: false,
            message: '',
            color: ''
        }
    },

    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'snackbar/showMessage') {
                this.message = state.snackbar.content
                this.color = state.snackbar.color
                this.show = true
            }
        })
    }
}
</script>
<style scoped>
.snackbar {
    left: auto;
    right: 0;
    position: absolute;
    top: 0;
    height: 26px !important;
    min-width: 32px !important;
    padding: 0 !important;
}
</style>