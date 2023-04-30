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

            axios.get(`http://192.168.40.131:3000/posts?category=${this.propDepartments[event.target.value]}`)
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.log(error);
                });

            this.$emit('departmentData', this.data.departmentData);
        }
    },

    data() {
        return {
            departments: null,
            departmentsData: null,
        }
    },

    mounted() {
        axios.get('http://192.168.40.131:3000/posts')
            .then(response => {
                this.$emit('departmentData', response.data);
            })
            .catch(error => {
                console.log(error);
            });

        this.departments = this.$refs.departments.querySelectorAll('li');


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