<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body col-lg-12">
                        <div id="formData">
                            <div class="row" ref="body">
                                <div v-for="image of images" class="mb-3" >
                                    <h3>{{ image.title }}</h3>
                                    <div v-for="subImage of image.subImages">
                                        <img :src="subImage" class="problem-picture" alt="problem-picture">
                                        <br>
                                        <br>
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
    export default {
        name: 'PictureSolution',

        data() {
            return {
                images: JSON.parse(localStorage.getItem('wolframSolutionImages')),
            }
        },
    }
</script>

<style scoped>
    .card-body {
        overflow-y: scroll;
        height: 700px;
    }

    template {
        background-image: url("src/assets/pictures/mathematic-background.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>