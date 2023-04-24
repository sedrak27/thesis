<template>
    <div class="parent-div d-flex">
        <Departments
                :prop-departments="data"
                :prop-page="currentPage"
                v-on:departmentData="getDepartmentData"
        ></Departments>

        <DepartmentData
                :prop-departmentData="departmentData"
                :prop-pagesCount="departmentPagesCount"
                v-on:currentPage="getCurrentPage"
        ></DepartmentData>
    </div>
</template>

<script>
import axios from "axios";
import Departments from "@/components/Home/Departments.vue";
import DepartmentData from "@/components/Home/DepartmentData.vue";

export default {
    name: "Main",
    components: {DepartmentData, Departments},

    methods: {
        getDepartmentData(data) {
            this.departmentData = data;

            this.departmentPagesCount = this.departmentData.length //Math.ceil(this.departmentData.length / 8);
        },

        getCurrentPage: function (currentPage) {
            this.currentPage = currentPage;
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

            departmentData: null,

            departmentPagesCount: null,

            currentPage: null,
        }
    },

    mounted() {
        axios.post('http://192.168.40.131:3000/')
            .then(response => {
                this.data = response.data;
            })
            .catch(error => {
                // console.log(error);
            });
    }
}
</script>

<style scoped>
    .parent-div {
        height: 85vh;
    }
</style>
