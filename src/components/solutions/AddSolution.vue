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
                                    <label for="title" class="form-label">Վերնագիր</label>
                                    <input class="form-control" id="title" ref="title" name="title">
                                </div>

                                <div class="mb-3">
                                    <label for="department" class="form-label">Բաժին</label>
                                    <select class="form-control" name="category" id="department" ref="department">
                                        <option v-for="department of departments" :value="department">{{ department }}</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="problem" class="form-label">Խնդիր</label>
                                    <div class="d-flex">
                                        <div class="problem-picture-div d-flex justify-content-end align-items-start">
                                            <img class="problem-picture" ref="problemPicture">
                                            <button v-if="removeButton" class="remove-problem-picture btn btn-danger d-flex justify-content-center align-items-center" ref="removeProblemPicture" @click="removeProblemPicture">X</button>
                                        </div>
                                        <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem"></textarea>
                                        <button class="btn btn-primary" type="button" @click="uploadProblemPicture">Խնդրի նկար</button>
                                    </div>
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
                                        <button class="btn btn-primary" type="button" @click="addText">Տեքստ</button>
                                    </div>
                                </div>

                                <div class="col-lg-12 d-flex justify-content-end">
                                    <button class="btn btn-primary" type="button" @click="saveSolutions">Պահպանել</button>
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
import { Uploader } from "uploader";
import { openUploadModal } from "@upload-io/vue-uploader";

const uploader = Uploader({ apiKey: "public_W142huD9woZpiW8MqRVgVZ57J4SC" });

export default {
    name: "AddSolution",

    data () {
        return {
            token: localStorage.getItem('jwtToken'),
            solution: [],
            images: [],
            currentSolution: 0,
            saveButton: false,
            removeButton:false,
            solutionImage: null,
            problem: null,
            solutionImageAsText: null,
            solutionDiv: null,
            cover_url: null,
            steps: [],
            departments: [
                'Մաթեմատիկա',
                'Ծրագրավորում',
                'Ֆիզիկա',
                'Քիմիա',
            ],
        }
    },

    methods: {
        saveSolutions() {
            this.checkFields(this.$refs);

            if (!this.saveButton && this.$refs.solutions.hasChildNodes()) {
                const form = document.getElementById("formData");
                const formData = new FormData(form);

                axios.post('http://localhost:3000/posts', {
                    title: formData.get('title'),
                    problem: this.problem,
                    category: formData.get('category'),
                    cover_url: this.cover_url,
                    description: formData.get('description'),
                    steps: this.steps,
                }, {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                }).then(response => {
                    this.userData = response.data;

                    window.location.href = '/posts';
                }).catch(error => {
                    console.log(error);
                });
            } else {
                alert('Լուծման դաշտը պարտադիր լրացվոող է');
            }
        },

        checkFields: function (fields) {
            for (const field in fields) {
                if (field !== 'body' && field !== 'solutions') {
                    if (!this.$refs[field].value) {
                        this.$refs[field].style = 'border: solid red 2px;';
                        this.$refs[field].placeholder = 'Դաշտը պարտադիր լրացվող է';

                    } else {
                        this.$refs[field].style = 'border: solid green 2px;';
                    }
                }
            }
        },

        addText() {
            if (!this.saveButton) {
                const div = document.createElement('div');
                div.classList.add('mb-3', 'd-flex');
                div.setAttribute('id', ++this.currentSolution);

                const textarea = document.createElement('textarea');
                textarea.classList.add('form-control');
                textarea.classList.add('text');

                div.appendChild(textarea);
                div.appendChild(this.removeButtonAction(this));

                this.$refs.solutions.appendChild(div);

                this.saveButton = true;
            }
        },

        save() {
            const inputs = this.$refs.solutions.querySelectorAll('div div .text');

            this.steps.push({
                title: inputs[inputs.length - 1].value
            });

            console.log(this.steps)


            for (const input of inputs) {
                if (!input.value) {
                    input.style = 'border: solid red 2px;';
                    input.placeholder = 'Դաշտը պարտադիր լրացվող է';
                    return;
                }

                input.style = 'border: solid green 2px;';
            }

            this.saveButton = false;
        },

        handlePictureUpload(files, parentThis) {
            const imageSolutionDiv = document.createElement('div');
            imageSolutionDiv.classList.add('mb-3');
            imageSolutionDiv.setAttribute('id', ++this.currentSolution);

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

            const editButton = document.createElement('button');
            editButton.innerHTML = 'Խմբագրել';
            editButton.classList.add('btn', 'btn-primary');
            editButton.value = this.currentSolution;
            editButton.addEventListener('click', function (event) {
                document.getElementById(this.value).remove();
                parentThis.steps.splice(+this.value, 1)
                parentThis.uploadFile(event);
            });

            const div = document.createElement('div');
            div.classList.add('col-lg-12', 'd-flex', 'justify-content-between');
            div.appendChild(parentThis.solutionImage);
            div.appendChild(textarea);
            div.appendChild(editButton);
            div.appendChild(this.removeButtonAction(parentThis));

            imageSolutionDiv.appendChild(div);

            parentThis.$refs.solutions.appendChild(imageSolutionDiv)

            parentThis.div.appendChild(imageSolutionDiv);
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
                        if (files.length !== 0) {
                            const fileUrl = files[0].originalFile.fileUrl;
                            const {data: {latex, wolfram}} = await axios.post(
                                'http://localhost:3000/photo',
                                { url: fileUrl }
                            )

                            this.solutionImageAsText = `${latex ? `Latex \n ${latex}` : ''} \n\n ${wolfram ? `Wolfram \n ${wolfram}` : ''} \n\n`;
                            this.steps.push({
                                title: latex || '',
                                content_url: fileUrl,
                            });

                            this.handlePictureUpload(files, this);
                        }
                    }
                })
            }
        },

        removeButtonAction: function (parentThis) {
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Հեռացնել';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.value = this.currentSolution;
            deleteButton.addEventListener('click', function () {
                document.getElementById(this.value).remove();
                parentThis.steps.splice(+this.value, 1);
                parentThis.saveButton = false;
            })

            return deleteButton;
        },

        removeProblemPicture: function () {
            this.$refs.problem.textContent = '';
            this.$refs.problemPicture.setAttribute('src', '');
            this.removeButton = false;
        },

        uploadProblemPicture(event) {
            openUploadModal({
                event,
                uploader,
                options: {
                    multi: false
                },
                onComplete: async (files) => {
                    if (files.length !== 0) {
                        const fileUrl = files[0].originalFile.fileUrl;
                        const {data: {latex, wolfram}} = await axios.post(
                            'http://localhost:3000/photo',
                            { url: fileUrl }
                        )

                        this.$refs.problem.textContent = `${latex ? `Latex \n ${latex}` : ''} \n\n ${wolfram ? `Wolfram \n ${wolfram}` : ''} \n\n`;
                        this.$refs.problemPicture.setAttribute('src', fileUrl);
                        this.problem = latex;
                        this.cover_url = fileUrl;
                        this.removeButton = true;
                    }
                }
            })
        },
    },
}
</script>

<style scoped>
    .container {
        height: 75vh;
    }

    .card-body {
        overflow-y: scroll;
        height: 700px;
    }

    .problem-picture-div {
        max-width: 350px;
        max-height: 250px;
        position: relative;
    }

    .remove-problem-picture {
        position: absolute;
        max-width: 20px;
        max-height: 25px;
        right: 7px;
        top: 7px;
    }

    .problem-picture {
        max-width: 350px;
        max-height: 250px;
    }
</style>