<template>
    <div class="col-lg-12">
        <div class="searchDiv col-lg-12 d-flex justify-content-center mt-3">
            <h2>{{ posts[0].first_name + ' ' + posts[0].last_name }}</h2>
        </div>

        <div class="department-data-parent col-lg-12 d-flex flex-column justify-content-start align-items-center mt-3" ref="propDepartmentDataParent">
            <router-link v-for="post of posts" @click="solution(post._id)" class="department-data text-center col-lg-12 pt-2 pb-2 d-flex justify-content-around" ref="propDepartmentData" to="/solution">
                <div class="col-lg-2 d-flex justify-content-center align-items-center">
                    <p>{{ post.category }}</p>
                </div>

                <div class="col-lg-3">
                    <img v-if="post.cover_url" :src="post.cover_url" :alt="post.cover_url" width="150" height="75">
                </div>

                <div class="col-lg-3 d-flex flex-column justify-content-center align-items-center">
                    <span class="title font-weight-bold"><strong>{{ post.title }}</strong></span>
                    <p class="long-text description">{{ handleDescription(post.description) }}</p>
                </div>

                <div class="col-lg-3 d-flex justify-content-center align-items-center">
                    <p>{{ post.created }}</p>
                </div>
            </router-link>

            <br>

            <RouterView />
        </div>
    </div>
</template>



<script>
import axios from "axios";
import Pagination from "@/components/pagination/Pagination.vue";

export default {

    methods: {
        userPosts: function (owner_id) {
            localStorage.setItem('owner_id', owner_id);
        },

        solution: function (post_id) {
            localStorage.removeItem('post_id');

            localStorage.setItem('post_id', post_id);
        },

        getCurrentPage: function (currentPage) {
            axios.get(`http://192.168.40.131:3000/user/posts?${localStorage.getItem('owner_id')}`, {
                params: {
                    skip: 6 * (currentPage - 1),
                    limit: 6,
                }
            })
                .then(response => {
                    this.posts = response.data;
                    this.pagesCount = Math.ceil(this.posts.length / 6);
                })
                .catch(error => {
                    console.error(error.message);
                });
        },

        handleDescription: function (description) {
            if (description.length > 30) {
                return description.slice(0, 30) + "...";
            }

            return description;
        },
    },

    data() {
        return {
            posts: [
                {
                    _id: '123123123asd3',
                    category: 'Քիմիա',
                    title: 'Հավասարություններ',
                    description: 'Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․',
                    owner_id: 'v123123123asd3',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'http://localhost:5173/src/assets/pictures/solution3.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd4',
                    category: 'Ֆիզիկա',
                    title: 'Հարթաչափություններ',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd4',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'http://localhost:5173/src/assets/pictures/solution4.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd5',
                    category: 'Ծրագրավորում',
                    title: 'Քառակուսի հավասարում',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd5',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'http://localhost:5173/src/assets/pictures/solution5.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd6',
                    category: 'Մաթեմատիկա',
                    title: 'Անհավասարություններ',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd6',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'http://localhost:5173/src/assets/pictures/solution6.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd6',
                    category: 'Մաթեմատիկա',
                    title: 'Անհավասարություններ',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd6',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'http://localhost:5173/src/assets/pictures/solution6.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd6',
                    category: 'Մաթեմատիկա',
                    title: 'Անհավասարություններ',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd6',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'http://localhost:5173/src/assets/pictures/solution6.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
            ],
            pagesCount: 5,
        }
    },

    mounted() {
        axios.post(`http://192.168.40.131:3000/posts/filter`, { owner_id: localStorage.getItem('owner_id') })
            .then(response => {
                this.posts = response.data;

            })
            .catch(error => {
                console.log(error.message);
            });
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

.department-data-parent {
    height: 75vh;
}

.department-data {
    text-decoration: none;
    color: inherit;
}

.searchDiv {
    max-height: 10vh;
}

.user-name {
    color: inherit;
}

</style>