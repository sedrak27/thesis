<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body col-lg-12">
                        <h5 class="card-title">Ավելացնել խնդիր</h5>
                        <hr>
                        <form id="formData" enctype="multipart/form-data">
                            <div class="row" ref="body">
                                <div class="mb-3">
                                    <label for="problem" class="form-label">Խնդիր</label>
                                    <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem"></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Լուծման նկարագրություն</label>
                                    <textarea class="form-control" id="description" rows="3" ref="description" name="description"></textarea>
                                </div>

                                <div class="mb-3">
                                    <div ref="solutions"></div>
                                    <button v-if="saveButton" class="btn btn-primary" type="button" @click="save">Պահել</button>
                                </div>

                                <div class="mb-3 d-flex flex-column">
                                    <label class="form-label">Լուծում</label>
                                    <div>
                                        <button class="btn btn-primary" type="button" @click="addPicture">Նկար</button> &nbsp;
                                        <button class="btn btn-primary" type="button" @click="addText">Տեքստ</button>
                                    </div>
                                </div>

                                <div class="col-lg-12 d-flex justify-content-end">
                                    <button class="btn btn-primary" type="button" @click="saveSolutions">Պահպանել</button>
                                </div>

                            </div>
                            <!--                                <div class="col-lg-4">-->
<!--                                    <div class="images-parent col-lg-12">-->
<!--                                        <div v-for="(image, index) in solution" :key="index" class="images">-->
<!--                                            <img :src="image.url" :alt="image.name">-->
<!--                                            <button class="remove-image" :value="index" @click="removeImage">X</button>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <button v-if="solution.length > 0" class="btn btn-primary mt-2" @click="clearImages">Մաքրել</button>-->
<!--                                </div>-->
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
            images: [],
            currentSolution: 0,
            saveButton: false,
            solutionImage: null,
            solutionDiv: null,
        }
    },

    methods: {
        saveSolutions() {
            if (!this.$refs.problem.value) {
                this.$refs.problem.style = 'border: solid red 2px;';
                this.$refs.problem.placeholder = 'Դաշտը պարտադիր լրացվող է';

                return;
            } else {
                this.$refs.problem.style = 'border: solid green 2px;';
            }

            if (!this.$refs.description.value) {
                this.$refs.description.style = 'border: solid red 2px;';
                this.$refs.description.placeholder = 'Դաշտը պարտադիր լրացվող է';

                return;
            } else {
                this.$refs.description.style = 'border: solid green 2px;';
            }

            if (!this.saveButton && this.$refs.solutions.hasChildNodes()) {
                const form = document.getElementById("formData");
                const formData = new FormData(form);

                axios.post('http://192.168.40.131:3000/solution/add', formData, {'Authorization': `Bearer ${this.token}`})
                    .then(response => {
                        this.userData = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                alert('Լուծման դաշտը պարտադիր լրացվոող է');
            }
        },

        addText() {
            if (!this.saveButton) {
                const div = document.createElement('div');
                div.classList.add('mb-3');

                const label = document.createElement('label');
                label.classList.add('form-label');
                label.textContent = ++this.currentSolution;

                const input = document.createElement('input');
                input.classList.add('form-control');
                input.setAttribute('name', 'solution-' + this.currentSolution);

                div.appendChild(label);
                div.appendChild(input);

                this.$refs.solutions.appendChild(div);

                this.saveButton = true;
            }
        },

        addPicture() {
            if (!this.saveButton) {
                this.div = document.createElement('div');
                this.div.classList.add('mb-3');

                const label = document.createElement('label');
                label.classList.add('form-label');
                label.textContent = ++this.currentSolution;

                const input = document.createElement('input');
                input.classList.add('form-control');
                input.setAttribute('name', 'solution-' + this.currentSolution);
                input.setAttribute('type', 'file');
                input.addEventListener('change', this.handlePictureUpload.bind(this))

                this.div.appendChild(label);
                this.div.appendChild(input);

                this.$refs.solutions.appendChild(this.div);

                this.saveButton = true;
            }
        },

        save() {
            const inputs = this.$refs.solutions.querySelectorAll('div div input');

            for (const input of inputs) {
                if (!input.value) {
                    input.style = 'border: solid red 2px;';
                    input.placeholder = 'Դաշտը պարտադիր լրացվող է';
                    return;
                }

                input.disabled = true
                input.style = 'border: solid green 2px;';
            }

            this.saveButton = false;
        },

        handlePictureUpload(event) {
            const imageDiv = document.createElement('div');

            this.solutionImage = document.createElement('img');
            this.solutionImage.classList.add('mt-3');
            this.solutionImage.setAttribute('width', '350px');
            this.solutionImage.setAttribute('height', '250px');


            const files = event.target.files;
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.images[this.currentSolution] = event.target.result;
                this.solutionImage.setAttribute('src', this.images[this.currentSolution]);
            };

            reader.readAsDataURL(file);

            imageDiv.appendChild(this.solutionImage);

            this.div.appendChild(imageDiv);
        },
    },
}
</script>

<style scoped>
    .container {
        height: 75vh;
    }
    .card-body {
        overflow:scroll;
        height: 700px;
    }
</style>