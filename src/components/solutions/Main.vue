<template>
<!--    <div class="container mt-5 mb-5">-->
<!--        <div class="row">-->
<!--            <div class="col-lg-12">-->
<!--                <div class="card">-->
<!--                    <div class="card-body col-lg-12">-->
<!--                        <h5 class="card-title">Ավելացնել խնդիր</h5>-->
<!--                        <hr>-->
<!--                        <div id="formData">-->
<!--                            <div class="row" ref="body">-->
<!--                                <div class="mb-3">-->
<!--                                    <label for="title" class="form-label">Վերնագիր</label>-->
<!--                                    <input class="form-control" id="title">-->
<!--                                </div>-->

<!--                                <div class="mb-3">-->
<!--                                    <label for="department" class="form-label">Բաժին</label>-->
<!--                                    <input class="form-control" id="department">-->
<!--                                </div>-->

<!--                                <div class="mb-3">-->
<!--                                    <label for="problem" class="form-label">Խնդիր</label>-->
<!--                                    <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem"></textarea>-->
<!--                                </div>-->

<!--                                <div class="mb-3">-->
<!--                                    <label for="description" class="form-label">Լուծման նկարագրություն</label>-->
<!--                                    <textarea class="form-control" id="description" rows="3" ref="description""></textarea>-->
<!--                                </div>-->

<!--                                <div class="mb-3">-->
<!--                                    <label class="form-label">Լուծում</label>-->
<!--                                    <div ref="solutions"></div>-->
<!--                                    <button v-if="saveButton" class="btn btn-primary" type="button" @click="save">Պահել</button>-->
<!--                                </div>-->

<!--                                <div class="mb-3 d-flex flex-column">-->
<!--                                    <div>-->
<!--                                        <button class="btn btn-primary" type="button" @click="uploadFile">Նկար</button> &nbsp;&nbsp;-->
<!--                                        <button class="btn btn-primary" type="button" @click="addText">Տեքստ</button>-->
<!--                                    </div>-->
<!--                                </div>-->

<!--                                <div class="col-lg-12 d-flex justify-content-end">-->
<!--                                    <button class="btn btn-primary" type="button" @click="saveSolutions">Պահպանել</button>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
export default {
    name: "Main",

    props: {
        propDepartmentData: Object,
    },

    methods: {
        isImage: function (url) {
            return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
        }
    },

    data () {
        return {
            departmentData: null,
            currentDepartmentData: null,
        }
    },



    mounted() {
    }

}
</script>

<style scoped>
    img {
        max-width: 350px;
        max-height: 250px;
    }
</style>