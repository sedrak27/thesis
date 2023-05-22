<template>
    <nav class="navbar navbar-expand-lg navbar-light d-flex flex-column col-lg-1">
        <div>
            <h4 class="text-light">Բաժիններ</h4>
        </div>
        <div class="collapse navbar-collapse d-flex" id="navbarNav">
            <ul class="navbar-nav d-flex flex-column justify-content-start" ref="departments">
                <li v-for="(department, index) of propDepartments" @click="currentDepartment" :value="index" class="department nav-link nav-item col-lg-12 d-flex justify-content-center align-items-center">
                    {{ department }}
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from "axios";

export default {
    name: "Departments",

    props: {
        propDepartments: Array,
        propPage: Number,
        propSolutionNumber: Number,
    },

    methods: {
        currentDepartment(event) {
            for (const department of this.departments) {
                department.style.backgroundColor = null;
                department.style.color = null;
            }

            event.target.style = 'background-color: rgb(255, 255, 255, .7); color: #2c3e50;';

            axios.post(
                `http://localhost:3000/posts/filter?skip=${0}&limit=${6}`,
                { category: this.propDepartments[event.target.value] }
            ).then(response => {
                this.data = response.data;
            }).catch(error => {
                console.log(errormessage);
            });

            this.$emit('posts', this.data.posts);
        }
    },

    data() {
        return {
            departments: null,
        }
    },

    mounted() {
        axios.post(`http://localhost:3000/posts/filter?skip=${0}&limit=${6}`)
            .then(response => {
                this.$emit('countOfPages', response.data.count);
                this.$emit('posts', response.data.posts);
            })
            .catch(error => {
                console.log(error.message);
            });

        this.departments = this.$refs.departments.querySelectorAll('li');
        this.$emit('posts', this.posts)
    }
}
</script>

<style scoped>
    .department {
        color: #f2f2f2;
    }

    .department:hover {
        background-color: rgb(255, 255, 255, .3);
        color: #2c3e50;
    }

    .navbar {
        background-color: #2c3e50;
        height: 100%;
    }

    .navbar-nav{
        height: 100%;
    }

</style>