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
                                    <label for="problem" class="form-label">Վերնագիր</label>
                                    <input class="form-control" id="problem" ref="title" name="title">
                                </div>

                                <div class="mb-3">
                                    <label for="problem" class="form-label">Խնդիր</label>
                                    <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem"></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Լուծման նկարագրություն</label>
                                    <textarea class="form-control" id="description" rows="3" ref="description" name="description"></textarea>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Լուծում</label>
                                    <div ref="solutions"></div>
                                    <button v-if="saveButton" class="btn btn-primary" type="button" @click="save">Պահել</button>
                                </div>

                                <div class="mb-3 d-flex flex-column">
                                    <div>
                                        <button class="btn btn-primary" type="button" @click="uploadFile">Նկար</button> &nbsp;&nbsp;

                                        <!--                                        <button class="btn btn-primary" type="button" @click="addPicture">Նկար</button> &nbsp;-->
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
import { Uploader } from "uploader";
import { openUploadModal } from "@upload-io/vue-uploader";
// import type { UploadWidgetOptions, UploadWidgetResult } from "uploader";
// import type { PreventableEvent } from "@upload-io/vue-uploader";

const uploader = Uploader({ apiKey: "public_12a1yBb77WrwonUXggpcvxVJFRZg" });


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
            solutionImageAsText: null,
            solutionDiv: null,
            steps: [],
        }
    },

    methods: {
        saveSolutions() {
            if (!this.$refs.title.value) {
                this.$refs.title.style = 'border: solid red 2px;';
                this.$refs.title.placeholder = 'Դաշտը պարտադիր լրացվող է';

                return;
            } else {
                this.$refs.title.style = 'border: solid green 2px;';
            }

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

                alert(JSON.stringify(this.token));

                axios.post('http://192.168.40.131:3000/posts', {
                    title: formData.get('title'),
                    problem: formData.get('problem'),
                    description: formData.get('description'),
                    steps: this.steps,
                }, {
                    headers: {'Authorization': `Bearer ${this.token}`}
                }).then(response => {
                    this.userData = response.data;
                }).catch(error => {
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

                const input = document.createElement('textarea');
                input.classList.add('form-control');
                input.classList.add('text');

                div.appendChild(label);
                div.appendChild(input);

                this.$refs.solutions.appendChild(div);

                this.saveButton = true;
            }
        },

        // addPicture(parentThis) {
        //     alert(parentThis.saveButton);
        //     if (!parentThis.saveButton) {
        //         parentThis.div = document.createElement('div');
        //         parentThis.div.classList.add('mb-3');
        //
        //         const label = document.createElement('label');
        //         label.classList.add('form-label');
        //         label.textContent = ++this.currentSolution;
        //
        //         const input = document.createElement('input');
        //         input.classList.add('form-control');
        //         input.setAttribute('name', 'solution-' + parentThis.currentSolution);
        //         input.setAttribute('type', 'file');
        //         input.setAttribute('accept', 'image/png, image/jpeg, image/jpg');
        //         input.addEventListener('change', parentThis.handlePictureUpload.bind(parentThis));
        //
        //         this.div.appendChild(label);
        //         this.div.appendChild(input);
        //
        //         console.log(parentThis.div);
        //
        //         parentThis.$refs.solutions.appendChild(parentThis.div);
        //
        //         this.saveButton = true;
        //     }
        // },

        save() {
            const inputs = this.$refs.solutions.querySelectorAll('div div .text');

            this.steps.push({
                title: inputs[inputs.length - 1].value,
            });

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

        handlePictureUpload(files, parentThis) {
            const imageSolutionDiv = document.createElement('div');

            const label = document.createElement('label');
            label.classList.add('form-label', 'col-lg-12');
            label.textContent = ++parentThis.currentSolution;

            parentThis.solutionImage = document.createElement('img');
            parentThis.solutionImage.classList.add('mt-3');
            parentThis.solutionImage.setAttribute('width', '350px');
            parentThis.solutionImage.setAttribute('height', '250px');

            const file = files[0];
            parentThis.images[parentThis.currentSolution] = file.fileUrl;
            parentThis.solutionImage.setAttribute('src', parentThis.images[parentThis.currentSolution]);

            const textarea = document.createElement('textarea');
            textarea.innerHTML = parentThis.solutionImageAsText;
            textarea.classList.add('form-control');
            textarea.setAttribute('row', '2');

            const div = document.createElement('div');
            div.classList.add('col-lg-12', 'd-flex', 'justify-content-between');
            div.appendChild(parentThis.solutionImage);
            div.appendChild(textarea);

            imageSolutionDiv.appendChild(label);
            imageSolutionDiv.appendChild(div);

            parentThis.$refs.solutions.appendChild(imageSolutionDiv)

            // parentThis.div.appendChild(imageSolutionDiv);
        },

        uploadFile(event) {
            if (!this.saveButton) {
                openUploadModal({
                    event,
                    uploader,
                    options: {
                        multi: true
                    },
                    onComplete: (files) => {
                        if (files.length === 0) {
                            alert("No files selected.");
                        } else {

                            axios.post(
                                'http://192.168.40.131:3000/solution/picture',
                                { url: files.map(f => f.fileUrl).join("\n") },
                                { 'Authorization': `Bearer ${this.token}` }
                            ).then(response => {
                                this.solutionImageAsText = response.data.text;

                                this.steps.push({
                                    title: 'a+b=babkenchik', //response.data.text,
                                    content_url: files.map(f => f.fileUrl).join("\n"),
                                })
                            }).catch(error => {
                                // console.log(error);
                            });

                            this.solutionImageAsText = "a+b=babken";

                            this.handlePictureUpload(files, this);
                        }
                    }
                })
            }
        }
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