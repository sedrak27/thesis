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
                `http://192.168.40.131:3000/posts/filter?skip=${0}&limit=${6}`,
                { category: this.propDepartments[event.target.value] }
            ).then(response => {
                this.data = response.data;
            }).catch(error => {
                console.log(error);
            });

            this.$emit('posts', this.data.posts);
        }
    },

    data() {
        return {
            departments: null,
            posts: [
                {
                    _id: '123123123asd1',
                    category: 'Քիմիա',
                    title: 'Քառակուսի հավասարում',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd1',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'src/assets/pictures/solution1.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd2',
                    category: 'Ծրագրավորում',
                    title: 'Անհավասարություններ',
                    description: 'Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է․․․',
                    owner_id: 'v123123123asd2',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'src/assets/pictures/solution2.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd3',
                    category: 'Քիմիա',
                    title: 'Հավասարություններ',
                    description: 'Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․Այս վարժությունը լուծվում է․․․',
                    owner_id: 'v123123123asd3',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'src/assets/pictures/solution3.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd4',
                    category: 'Ֆիզիկա',
                    title: 'Հարթաչափություններ',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd4',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'src/assets/pictures/solution4.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd5',
                    category: 'Ծրագրավորում',
                    title: 'Քառակուսի հավասարում',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd5',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'src/assets/pictures/solution5.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
                {
                    _id: '123123123asd6',
                    category: 'Մաթեմատիկա',
                    title: 'Անհավասարություններ',
                    description: 'Այս վարժությունը լուծվում է',
                    owner_id: 'v123123123asd6',
                    first_name: 'John',
                    last_name: 'Legend',
                    cover_url: 'src/assets/pictures/solution6.jpg',
                    created: '2023-05-01T12:12:16.564Z',
                },
            ],
        }
    },

    mounted() {

        console.log(this.propPage);
        axios.post(`http://192.168.40.131:3000/posts/filter?skip=${0}&limit=${6}`)
            .then(response => {
                this.$emit('countOfPages', response.data.count);
                this.$emit('posts', response.data.posts);

                console.log(response.data.posts);
            })
            .catch(error => {
                console.log(error);
            });

        this.departments = this.$refs.departments.querySelectorAll('li');
console.log(this.posts)
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