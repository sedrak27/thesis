<template>
    <Header/>

    <RouterView />

    <Footer/>

</template>

<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Header from './components/header/Header.vue'
import Footer from "@/components/footer/Footer.vue";
import Main from "@/components/home/Main.vue";

</script>

<style scoped>

</style>
