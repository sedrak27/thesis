<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body col-lg-12">
                        <h5 class="card-title"><router-link to="/user/posts" @click="userPosts(currentDepartmentData.owner_id)"> {{ currentDepartmentData.first_name + ' ' + currentDepartmentData.last_name }} </router-link></h5>
                        <hr>
                        <div id="formData">
                            <div class="row" ref="body">
                                <div class="mb-3">
                                    <label for="title" class="form-label">Վերնագիր</label>
                                    <input class="form-control" id="title" :value="currentDepartmentData.title" readonly>
                                </div>

                                <div class="mb-3">
                                    <label for="department" class="form-label">Բաժին</label>
                                    <input class="form-control" id="department" :value="currentDepartmentData.category" readonly>
                                </div>

                                <div class="mb-3">
                                    <label for="problem" class="form-label">Խնդիր</label>
                                    <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem" disabled>{{ currentDepartmentData.problem }}</textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Նկարագրություն</label>
                                    <textarea class="form-control" id="description" rows="3" disabled>{{ currentDepartmentData.description }}</textarea>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Լուծում</label>
                                    <div v-for="step of currentDepartmentData.steps" class="mt-3">
                                        <div class="col-lg-12 d-flex">
                                            <img v-if="step.url" :src="step.url" :alt="step.url">
                                            <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem" disabled>{{ step.title }}</textarea>
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

    data () {
        return {
            departmentData: null,
            currentDepartmentData: {
                title: 'vernagir',
                description: 'nkaragrutyun',
                cover_url: 'asd',
                problem: 'problem chka axpers',
                category: 'Mathem',
                _id: '644faca0da8a66bd4cd7e2a9',
                owner_id: '644d7f27fcab5bbba42fc9de',
                first_name: 'Babken',
                last_name: 'Babkenyan',
                created: '2023-05-01T12:12:16.564Z',
                steps: [
                    {
                        title: 'a+b=babken'
                    },
                    {
                        title: 'a+b=babken',
                        url: 'src/assets/pictures/solution1.jpg',
                    },
                    {
                        title: 'a+b=babken'
                    },
                    {
                        title: 'a+b=babken',
                        url: 'src/assets/pictures/solution2.jpg',
                    },
                    {
                        title: 'a+b=babken'
                    },
                    {
                        title: 'a+b=babken',
                        url: 'src/assets/pictures/solution3.jpg',

                    },
                    {
                        title: 'a+b=babken'
                    },
                ],
    }
    ,
        }
    },


    mounted() {
        console.log(`http://192.168.40.131:3000/solution/${localStorage.getItem('post_id')}`);

        axios.get(`http://192.168.40.131:3000/solution/${localStorage.getItem('post_id')}`)
            .then(response => {

            })
            .catch(error => {

            })
    }

}
</script>

<style scoped>
    img {
        max-width: 350px;
        max-height: 250px;
    }
</style>