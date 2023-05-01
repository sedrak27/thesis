<template>
    <div class="col-lg-11">
        <div class="searchDiv col-lg-11 d-flex justify-content-center mt-3">
            <form @submit.prevent="search" class="d-flex col-lg-6" role="search">
                <input class="form-control me-2" type="search" placeholder="Որոնել" aria-label="Search" v-model="searchData">
                <button class="btn btn-outline-primary" type="submit">Որոնել</button> &nbsp;&nbsp;
                <button class="btn btn-primary" type="button" @click="uploadFile">Որոնել նկարով</button>
            </form>
        </div>

        <div class="department-data-parent col-lg-11 d-flex flex-column justify-content-start align-items-center" ref="propDepartmentDataParent">
            <router-link v-for="(data, index) of propDepartmentData" :key="index" @click="solution" class="department-data text-center col-lg-12 pt-3 d-flex flex-column align-items-center" ref="propDepartmentData" to="/solution">
                <input type="hidden" :value="index">
                <span class="title font-weight-bold"><strong>{{ data.title }}</strong></span>
                <p :aria-valuenow="index" class="long-text description col-lg-3">{{ handleDescription(data.description) }}</p>
            </router-link>

            <hr>

            <Pagination
                    class="pagination"
                    :prop-count="propPagesCount"
                    v-on:currentPage="getCurrentPage"
            ></Pagination>

            <RouterView />
        </div>
    </div>

</template>

<script>
import Pagination from "@/components/pagination/Pagination.vue";
import axios from "axios";
import { Uploader } from "uploader";
import { openUploadModal } from "@upload-io/vue-uploader";

const uploader = Uploader({ apiKey: 'public_12a1yBb77WrwonUXggpcvxVJFRZg' });

export default {
    name: "DepartmentData",
    components: { Pagination },

    props: {
        propDepartmentData: Array,
        propPagesCount: Number,
    },

    methods: {
        getCurrentPage: function (currentPage) {
            console.log({
                skip: 8 * (currentPage - 1),
                limit: 8,
            });
            axios.get('http://192.168.40.131:3000/departments/', {
                params: {
                    offset: 8 * (currentPage - 1),
                    limit: 8,
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

        uploadFile(event) {
            if (!this.saveButton) {
                openUploadModal({
                    event,
                    uploader,
                    options: {
                        multi: false
                    },
                    onComplete: (files) => {
                        if (files.length === 0) {
                            alert("No files selected.");
                        } else {
                            const fileUrl = files[0].originalFile.fileUrl;

                            axios.post(
                                'http://192.168.40.131:3000/search/photo',
                                { url: fileUrl },
                            ).then(response => {
                                // this.propDepartmentData = response.data.post_ids;
                                console.log(response.data.post_ids);
                            }).catch(error => {
                                console.log(error.message);
                            });
                        }
                    }
                })
            }
        },

        search: function () {
            axios.post('http://192.168.40.131:3000/search/text', { text: this.searchData })
                .then(response => {
                    console.log(response.data);
                    // this.propDepartmentData = response.data;
                })
                .catch(error => {
                    alert('Ինչ որ բան սխալ ընթացավ');
                });

            this.$emit('currentPage', this.pageName);
        },

        handleDescription: function (description) {
            if (description.length > 30) {
                return description.slice(0, 30) + "...";
            }

            return description;
        }
    },

    data() {
        return {
            countOfPages: null,
            currentPage: null,
            searchData: null,
        }
    },
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
        height: 75vh;
    }

    .department-data {
        text-decoration: none;
        color: inherit;
    }

    .searchDiv {
        max-height: 10vh;
    }

    .pagination {
        margin-top: 15vh;
    }

</style>