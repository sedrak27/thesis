<template>
    hello
</template>

<script>
export default {
    name: "Main",

    props: {
        propDepartmentData: Object,
    },

    methods: {
        isImage: function (url) {
            return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
        }
    },

    data () {
        return {
            departmentData: null,
            currentDepartmentData: null,
        }
    },



    mounted() {
    }

}
</script>

<style scoped>
    img {
        max-width: 350px;
        max-height: 250px;
    }
</style>