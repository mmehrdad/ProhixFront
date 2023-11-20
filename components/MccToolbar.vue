<template>
    <v-toolbar :elevation="elevation" :dense="dense" :rounded="rounded" :flat="flat" :dark="dark" :class="classes"
        :color="color">
        <slot name="default" />
    </v-toolbar>
</template>

<script>
export default {
    name: 'GtgToolbar',
    components: {},

    props: {
        elevation: {
            type: Number,
            default: 1,
        },
        dense: {
            type: Boolean,
            default: true,
        },
        rounded: {
            type: Boolean,
            default: true,
        },
        flat: {
            type: Boolean,
            default: false,
        },
        dark: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: 'dialogHead',
        },
        classes: {
            type: String,
            default: 'my-2 mx-1',
        },
    },

    data() {
        return {};
    },

    computed: {},
};
</script>
