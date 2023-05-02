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
                                    <select class="form-control" name="department" id="department" ref="department">
                                        <option v-for="department of departments" :value="department">{{ department }}</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="problem" class="form-label">Խնդիր</label>
                                    <div class="d-flex">
                                        <textarea class="form-control" id="problem" rows="3" ref="problem" name="problem"></textarea>
                                        <button class="btn btn-primary" type="button" @click="uploadFile">Խնդրի նկար</button>

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

                axios.post('http://192.168.40.131:3000/posts', {
                    title: formData.get('title'),
                    problem: formData.get('problem'),
                    description: formData.get('description'),
                    steps: this.steps,
                }, {
                    headers: {'Authorization': `Bearer ${this.token}`}
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
            console.log(fields);
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
                div.appendChild(this.removeButton(this));

                this.$refs.solutions.appendChild(div);

                this.saveButton = true;
            }
        },

        save() {
            const inputs = this.$refs.solutions.querySelectorAll('div div .text');

            this.steps[this.currentSolution] = {
                title: inputs[inputs.length - 1].value
            };

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
            div.appendChild(this.removeButton(parentThis));

            imageSolutionDiv.appendChild(div);

            parentThis.$refs.solutions.appendChild(imageSolutionDiv)

            // parentThis.div.appendChild(imageSolutionDiv);
        },

        uploadFile(event) {
            if (!this.saveButton) {
                let text;
                openUploadModal({
                    event,
                    uploader,
                    options: {
                        multi: false
                    },
                    onComplete: async (files) => {
                        if (files.length === 0) {
                            alert("No files selected.");
                        } else {
                            const fileUrl = files[0].originalFile.fileUrl;
                            const {data: {text, latex, wolfram}} = await axios.post(
                                'http://192.168.40.131:3000/photo',
                                { url: fileUrl }
                            )

                            this.solutionImageAsText = `${text ? `Text \n ${text}` : ''} \n\n ${latex ? `Latex \n ${latex}` : ''} \n\n ${wolfram ? `Wolfram \n ${wolfram}` : ''} \n\n`;
                            this.steps[this.currentSolution] = {
                                title: latex,
                                content_url: fileUrl,
                            };

                            this.handlePictureUpload(files, this);
                        }
                    }
                })
            }
        },

        removeButton: function (parentThis) {
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