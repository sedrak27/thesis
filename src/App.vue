<template>
    <div>
        <Header/>

        <RouterView />

        <Footer/>
    </div>
</template>

<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Header from './components/header/Header.vue'
import Footer from "@/components/footer/Footer.vue";
import Main from "@/components/home/Main.vue";

</script>

<style scoped>
    div {
        background-image: url("src/assets/pictures/mathematic-background.jpg");
    }
</style>
