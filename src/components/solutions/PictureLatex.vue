<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body col-lg-12">
                        <div id="formData">
                            <div class="row" ref="body">
                                <h3>{{ latex }}</h3>
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
            latex: JSON.parse(localStorage.getItem('latex')),
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