<template>
    <div class="parent-div d-flex">
        <Departments
                :prop-departments="data"
                :prop-page="currentPage"
                :prop-solutionNumber="solutionNumber"
                v-on:departmentData="getDepartmentData"
        ></Departments>

        <DepartmentData
                :prop-departmentData="departmentData"
                :prop-pagesCount="departmentPagesCount"
                v-on:solutionNumber="getSolutionNumber"
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
        getDepartmentData(data) {
            this.departmentData = data;
            this.departmentPagesCount = Math.ceil(this.departmentData.length / 6);
        },

        getSolutionNumber(number) {
            localStorage.setItem('solution', JSON.stringify(this.departmentData[number]));
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
            solutionNumber: null,
        }
    },
}
</script>

<style scoped>
    .parent-div {
        height: 85vh;
    }
</style>
