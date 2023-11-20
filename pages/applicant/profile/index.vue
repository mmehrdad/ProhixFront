<template>
    <div>


    </div>
</template>

<script>
import { POSITION } from "vue-toastification";
export default {
    // 
    layout: 'applicant',
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