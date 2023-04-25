<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body col-lg-12">
                        <h5 class="card-title">Ավելացնել խնդիր</h5>
                        <hr>
                        <form @submit.prevent="changeProfileData" enctype="multipart/form-data">
                            <div class="row">

                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="address" class="form-label">Խնդիր</label>
                                        <textarea class="form-control" id="address" rows="3"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="address" class="form-label">Լուծման նկարագրություն</label>
                                        <textarea class="form-control" id="address" rows="3"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="avatar" class="form-label">Լուծում</label>
                                        <input type="file" class="form-control" multiple @change="handleFileUpload">
                                    </div>

                                    <div class="col-lg-12 d-flex justify-content-end">
                                        <button class="btn btn-primary" type="submit">Պահպանել</button>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="images-parent col-lg-12">
                                        <div v-for="(image, index) in images" :key="index" class="images">
                                            <img :src="image.url" :alt="image.name">
                                            <button class="remove-image" :value="index" @click="removeImage">X</button>
                                        </div>
                                    </div>
                                    <button v-if="solution.length > 0" class="btn btn-primary mt-2" @click="clearImages">Մաքրել</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AddSolution",

    data () {
        return {
            token: localStorage.getItem('jwtToken'),
            solution: [],
        }
    },

    methods: {
        changeProfileData() {
            axios.post('http://192.168.40.131:3000/solution/add', this.userData, { 'Authorization': `Bearer ${this.token}` })
                .then(response => {
                    this.userData = response.data;
                })
                .catch(error => {
                    // console.log(error);
                });
        },

        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.images.push({
                        name: file.name,
                        url: event.target.result,
                    });
                };
                reader.readAsDataURL(file);
            }
        },

        removeImage(event) {
            this.images.splice(event.target.value, 1);
        },

        clearImages() {
            this.images = [];
        }
    },
}
</script>

<style scoped>
    .container {
        height: 75vh;
    }

    .remove-image {
        max-width: 50px;
        max-height: 30px;
        border: 1px black solid;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        top: 10px;
        font-weight: bold;
    }

    .images-parent {
        display: flex;
        flex-wrap: wrap;
    }

    .images {
        position: relative;
        max-width: 200px;
        max-height: 150px;
    }

    img {
        max-width: 200px;
        max-height: 150px;
    }

    .card-body {
        overflow:scroll;
        height: 700px;
    }
</style>