<template>
    <div class="col-lg-11">
        <div class="searchDiv col-lg-11 d-flex justify-content-center mt-3">
            <button class="btn btn-warning" type="button" @click="wolfram">Լուծել Wolfram֊ով</button> &nbsp;&nbsp;
            <button class="btn btn-warning" type="button" @click="latex">Ստանալ Latex֊ը</button> &nbsp;&nbsp;

            <form @submit.prevent="search" class="d-flex col-lg-6" role="search">
                <input class="form-control me-2" type="search" placeholder="Որոնել" aria-label="Search" v-model="searchData">
                <button class="btn btn-success" type="submit">Որոնել</button> &nbsp;&nbsp;
                <button class="btn btn-primary" type="button" @click="uploadFile">Որոնել նկարով</button> &nbsp;&nbsp;
            </form>
        </div>

        <div class="department-data-parent col-lg-12 d-flex flex-column justify-content-start align-items-center mt-5" ref="propDepartmentDataParent">
            <router-link v-for="post of searchPostsResult && searchPostsResult.length !== 0 ? searchPostsResult : propPosts" @click="solution(post._id)" class="department-data text-center col-lg-12 pt-2 pb-2 d-flex justify-content-around" ref="posts" to="/solution">
                <div class="col-lg-2">
                    <img v-if="post.cover_url" :src="post.cover_url" :alt="post.cover_url" width="150" height="75">
                </div>

                <div class="col-lg-2 d-flex flex-column justify-content-center align-items-center">
                    <span class="title font-weight-bold"><strong>{{ post.title }}</strong></span>
                    <p class="long-text description">{{ handleDescription(post.description) }}</p>
                </div>

                <div class="col-lg-2 d-flex justify-content-center align-items-center">
                    <router-link to="/user/posts" class="user-name" @click="userPosts(post.owner_id)">{{ post.first_name + ' ' + post.last_name }}</router-link>
                </div>

                <div class="col-lg-2 d-flex justify-content-center align-items-center">
                    <p>{{ post.created.slice(0, 10) }}</p>
                </div>
            </router-link>

            <hr>

            <Pagination
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

const uploader = Uploader({ apiKey: 'public_W142huD9woZpiW8MqRVgVZ57J4SC' });

export default {
    name: "DepartmentData",
    components: { Pagination },

    props: {
        propPosts: Array,
        propPagesCount: Number,
    },

    methods: {
        getCurrentPage: async function (currentPage) {
            this.skipCount = 6 * (currentPage - 1);

            await axios.post(
                `http://localhost:3000/posts/filter?skip=${this.skipCount}&limit=${6}`)
                .then(response => {
                    this.searchPostsResult = response.data.posts;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        solution: function (post_id) {
            localStorage.removeItem('post_id');

            localStorage.setItem('post_id', post_id);
        },

        uploadFile(event) {
            if (!this.saveButton) {
                openUploadModal({
                    event,
                    uploader,
                    options: {
                        multi: false
                    },
                    onComplete: async (files) => {
                        this.skipCount = 0;

                        if (files.length === 0) {
                            alert("No files selected.");
                        } else {
                            const fileUrl = files[0].originalFile.fileUrl;

                            const { data: { posts, count }} = await axios.post(
                                `http://localhost:3000/search/photo?skip=${this.skipCount}&limit=${6}`,
                                { url: fileUrl },
                            )
                            alert('aaaaaaa' + count)
                            this.posts = posts;
                            this.countOfPages = count;
                        }
                    }
                })
            }
        },

        search: async function () {
            this.skipCount = 0;
            await axios.post(`http://localhost:3000/search/text?skip=${this.skipCount}&limit=${6}`, { text: this.searchData })
                .then(response => {
                    console.log(response.data.posts);
                    this.searchPostsResult = response.data.posts;
                })
                .catch(error => {
                    console.log(error.message);
                    //alert('Ինչ որ բան սխալ ընթացավ');
                });

            this.$emit('currentPage', this.pageName);
        },

        handleDescription: function (description) {
            if (description.length > 30) {
                return description.slice(0, 30) + "...";
            }

            return description;
        },

        userPosts: function (owner_id) {
            localStorage.setItem('owner_id', owner_id);
        },

        wolfram: function (event) {
            openUploadModal({
                event,
                uploader,
                options: {
                    multi: false
                },
                onComplete: async (files) => {
                    if (files.length === 0) {
                        alert("No files selected.");
                    } else {
                        const fileUrl = files[0].originalFile.fileUrl;
                        const { data: { images } } = await axios.post(
                            'http://localhost:3000/photo/solution',
                            { url: fileUrl }
                        )

                        localStorage.setItem('wolframSolutionImages', JSON.stringify(images));
                        window.location.href = '/wolfram/solution';
                    }
                }
            })
        },

        latex: function (event) {
            openUploadModal({
                event,
                uploader,
                options: {
                    multi: false
                },
                onComplete: async (files) => {
                    if (files.length === 0) {
                        alert("No files selected.");
                    } else {
                        const fileUrl = files[0].originalFile.fileUrl;
                        const { data: { latex } } = await axios.post(
                            'http://localhost:3000/photo/solution',
                            { url: fileUrl }
                        )

                        localStorage.setItem('pictureLatex', latex);
                        window.location.href = '/wolfram/solution';
                    }
                }
            })
        }
    },

    data() {
        return {
            countOfPages: null,
            currentPage: null,
            searchData: null,
            skipCount: null,
            searchPostsResult: null
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
        background-color: #f2f2f2;
    }

    .searchDiv {
        max-height: 10vh;
    }

    .user-name {
        color: inherit;
    }

</style>