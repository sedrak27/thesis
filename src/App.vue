<template>
    <Header/>

    <Main/>

    <RouterView />

    <Footer/>

</template>

<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Header from './components/header/Header.vue'
import Footer from "@/components/footer/Footer.vue";
import Main from "@/components/Home/Main.vue";

</script>

<style scoped>

</style>
