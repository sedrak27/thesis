<template>
    <div class="parent-div d-flex">

        <Departments
                :prop-departments="data"
                :prop-page="currentPage"
                :prop-solutionNumber="solutionNumber"
                v-on:posts="getPosts"
                v-on:countOfPosts="getCountOfPosts"
        ></Departments>

        <DepartmentData
                :prop-posts="posts"
                :prop-pagesCount="departmentPagesCount"
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
            this.countOfPosts = Math.ceil(countOfPosts / 6);
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
            countOfPosts: 0,
        }
    },

    mounted() {
        console.log(this.departmentPagesCount);
    }
}
</script>

<style scoped>
    .parent-div {
        height: 85vh;
    }
</style>
