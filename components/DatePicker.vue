<template>
    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
        <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="cmpValue" :label="label" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="cmpValue" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">
                Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
            </v-btn>
        </v-date-picker>
    </v-dialog>
</template>
<script>
export default {
    data: () => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        modal: false,
    }),
    model: { prop: 'value', event: 'input' },
    props: {
        // مقدار بایند شده
        value: {

        },
        // لیبل نمایشی
        label: {
            type: String,
            default: '',
        },
    },
    computed: {
        cmpValue: {
            get: function () {
                return this.value
            },
            set: function (newValue) {
                this.$emit('input', newValue)
            },
        },
    },
}
</script>