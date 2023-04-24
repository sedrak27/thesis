<template>
    <div class="department-data-parent col-lg-11 d-flex flex-column justify-content-between align-items-center">
        <div v-for="data of propDepartmentData" class="department-data text-center">
            <span class="title font-weight-bold"><strong>{{ data.title }}</strong></span>
            <p ref="description" class="long-text description">{{ data.short_description }}</p>
        </div>

        <span class="full-width-span"></span>

        <Pagination
                :prop-count="propPagesCount"
                v-on:currentPage="getCurrentPage"
        ></Pagination>
    </div>

</template>

<script>
import Pagination from "@/components/pagination/Pagination.vue";

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
        }
    },

    data () {
        return {
            countOfPages: null,
            currentPage: null,
        }
    }
}
</script>

<style scoped>

    .department-data:hover {
        background-color: rgb(44, 62, 80, .7);
        color: #f2f2f2;
    }

    .department-data-parent{
        height: 85vh;
    }

    /*.description {*/
    /*    width: 250px;*/
    /*    white-space: nowrap;*/
    /*    overflow: hidden;*/
    /*    text-overflow: ellipsis;*/
    /*}*/

    .full-width-span {
        display: block;
    }

</style>