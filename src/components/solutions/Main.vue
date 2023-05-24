<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body col-lg-12">
                        <h5 class="card-title">
                            <router-link to="/user/posts" @click="userPosts(currentDepartmentData.post.owner_id)">
                                {{ currentDepartmentData.post.first_name + ' ' + currentDepartmentData.post.last_name }}
                            </router-link>
                        </h5>
                        <hr>
                        <div id="formData">
                            <div class="row">
                                <div class="mb-3">
                                    <label for="title" class="form-label">Վերնագիր</label>
                                    <input class="form-control" id="title" :value="currentDepartmentData.post.title"
                                           readonly>
                                </div>

                                <div class="mb-3">
                                    <label for="department" class="form-label">Բաժին</label>
                                    <input class="form-control" id="department" :value="currentDepartmentData.post.category"
                                           readonly>
                                </div>

                                <div class="mb-3">
                                    <label for="problem" class="form-label">Խնդիր</label>
                                    <div class="d-flex">
                                        <img v-if="currentDepartmentData.post.cover_url"
                                             :src="currentDepartmentData.post.cover_url" class="problem-picture"
                                             alt="problem-picture">
                                        <textarea class="form-control" id="problem" rows="3" name="problem" disabled>{{ currentDepartmentData.post.problem }}</textarea>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Նկարագրություն</label>
                                    <textarea class="form-control" id="description" rows="3" disabled>{{ currentDepartmentData.post.description }}</textarea>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Լուծում</label>
                                    <div v-for="step of currentDepartmentData.steps" class="mt-3">
                                        <div class="col-lg-12 d-flex">
                                            <img v-if="step.content_url" :src="step.content_url" :alt="step.content_url">
                                            <textarea class="form-control" id="problem" rows="3" name="problem" disabled>{{ step.title }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Main",

    methods: {
        userPosts: function (owner_id) {
            localStorage.setItem('owner_id', owner_id);
        }
    },

    data() {
        return {
            currentDepartmentData: JSON.parse(localStorage.getItem('current_solution')),
        }
    },

    mounted() {
        console.log(this.currentDepartmentData)
    }
}
</script>

<style scoped>
img {
    max-width: 350px;
    max-height: 250px;
}

.card-title a {
    color: inherit;
}

.problem-picture {
    max-width: 350px;
    max-height: 250px;
}
</style>