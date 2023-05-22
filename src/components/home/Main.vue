<template>
    <div class="parent-div d-flex">

        <Departments
                :prop-departments="data"
                :prop-page="currentPage"
                :prop-solutionNumber="solutionNumber"
                v-on:posts="getPosts"
                v-on:countOfPages="getCountOfPosts"
        ></Departments>

        <DepartmentData
                :prop-posts="posts"
                :prop-pagesCount="countOfPages"
        ></DepartmentData>
    </div>
</template>

<script>
import axios from "axios";
import Departments from "@/components/home/Departments.vue";
import DepartmentData from "@/components/home/DepartmentData.vue";

export default {
    name: "Main",
    components: {DepartmentData, Departments},

    methods: {
        getPosts(posts) {
            this.posts = posts;
        },

        getCountOfPosts(countOfPosts) {
            this.countOfPages = Math.ceil(countOfPosts / 6);
        }
    },

    data () {
        return {
            data: [
                'Մաթեմատիկա',
                'Ծրագրավորում',
                'Ֆիզիկա',
                'Քիմիա',
            ],
            posts: null,
            currentPage: null,
            solutionNumber: null,
            countOfPages: 0,
        }
    },
}
</script>

<style scoped>
    .parent-div {
        height: 85vh;
    }
</style>
