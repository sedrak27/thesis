<template>
    <div class="department-data-parent col-lg-11 d-flex flex-column justify-content-between align-items-center" ref="propDepartmentDataParent">
        <router-link v-for="(data, index) of propDepartmentData" :key="index" @click="solution" class="department-data text-center col-lg-12 pt-3 d-flex flex-column align-items-center" ref="propDepartmentData" to="/solution">
            <input type="hidden" :value="index">
            <span class="title font-weight-bold"><strong>{{ data.title }}</strong></span>
            <p :aria-valuenow="index" class="long-text description col-lg-3">{{ data.description }}</p>
        </router-link>

        <hr>

        <Pagination
                :prop-count="propPagesCount"
                v-on:currentPage="getCurrentPage"
        ></Pagination>

        <RouterView />
    </div>

</template>

<script>
import Pagination from "@/components/pagination/Pagination.vue";
import axios from "axios";

export default {
    name: "DepartmentData",
    components: { Pagination },

    props: {
        propDepartmentData: Array,
        propPagesCount: Number,
    },

    methods: {
        getCurrentPage: function (currentPage) {

            axios.get('http://192.168.40.131:3000/departments/', {
                params: {
                    page: currentPage,
                }
            })
                .then(response => {
                    this.propDepartmentData = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        solution: function (event) {
            this.$emit('solutionNumber', event.target.ariaValueNow);
        },
    },

    data() {
        return {
            countOfPages: null,
            currentPage: null,
        }
    },

    mounted() {
        const descriptions = document.getElementsByClassName('description');

        for (let i = 0; i < descriptions.length; i++) {
            const words = descriptions[i].innerHTML.split(' ')

            if (words.length > 10) {
                descriptions[i].innerHTML = words.splice(0, 10).join(' ') + "...";
            }
        }
    }
}
</script>

<style scoped>

    .department-data:hover {
        background-color: rgb(44, 62, 80, .7);
        color: #f2f2f2;
    }

    .department-data:hover span, .department-data:hover p {
        color: #f2f2f2;
    }

    .department-data-parent{
        height: 85vh;
    }

    .full-width-span {
        display: block;
    }

    .department-data {
        text-decoration: none;
        color: inherit;
    }

</style>