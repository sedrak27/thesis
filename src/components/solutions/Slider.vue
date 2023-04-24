<template>

    <div class="slider">
        <div class="slider-content" :style="{ transform: 'translateX(' + translateX + 'px)' }">
            <div>
                <slider>
                    <div class="slide">
                        <img src="src/assets/pictures/solution1.jpg">
                    </div>
                    <div class="slide">
                        <img src="src/assets/pictures/solution2.jpg">
                    </div>
                    <div class="slide">
                        <img src="src/assets/pictures/solution3.jpg">
                    </div>
                    <div class="slide">
                        <img src="src/assets/pictures/solution4.jpg">
                    </div>
                    <div class="slide">
                        <img src="src/assets/pictures/solution5.jpg">
                    </div>
                </slider>
            </div>
        </div>
        <div class="slider-nav">
            <button @click="prevSlide">Prev</button>
            <button @click="nextSlide">Next</button>
        </div>
    </div>












<!--    <div>-->
<!--        <vue-carousel :per-page="1">-->
<!--            <img src="src/assets/pictures/solution1.jpg">-->
<!--            <img src="src/assets/pictures/solution2.jpg">-->
<!--            <img src="src/assets/pictures/solution3.jpg">-->
<!--        </vue-carousel>-->
<!--    </div>-->
<!--    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">-->
<!--        <div class="carousel-inner">-->
<!--            <div v-for="picture of pictures" class="carousel-item active">-->
<!--                <img class="d-block w-100" :src="'src/assets/pictures/' + picture" alt="First slide">-->
<!--            </div>-->
<!--            <div class="carousel-item">-->
<!--                <img class="d-block w-100" src="..." alt="Second slide">-->
<!--            </div>-->

<!--        </div>-->
<!--        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">-->
<!--            <span class="carousel-control-prev-icon" aria-hidden="true"></span>-->
<!--            <span class="sr-only"></span>-->
<!--        </a>-->
<!--        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">-->
<!--            <span class="carousel-control-next-icon" aria-hidden="true"></span>-->
<!--            <span class="sr-only"></span>-->
<!--        </a>-->
<!--    </div>-->


<!--    <carousel>-->
<!--        <slide>-->
<!--            <img src="src/assets/pictures/solution1.jpg" alt="">-->
<!--        </slide>-->
<!--        <slide>-->
<!--            <img src="src/assets/pictures/solution1.jpg" alt="">-->
<!--        </slide>-->
<!--        <slide>-->
<!--            <img src="src/assets/pictures/solution1.jpg" alt="">-->
<!--        </slide>-->
<!--    </carousel>-->
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Slider from './Slider.vue';
import axios from "axios";

export default {
    name: "Slider",

    data() {
        return {
            currentSlide: 0,
            slideCount: 0,
            slideWidth: 0,
            translateX: 0,
        };
    },
    mounted() {
        this.slideCount = this.$slots.default.length;
        this.slideWidth = this.$el.offsetWidth;
    },
    methods: {
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.translateX += this.slideWidth;
            }
        },
        nextSlide() {
            if (this.currentSlide < this.slideCount - 1) {
                this.currentSlide++;
                this.translateX -= this.slideWidth;
            }
        }
    }
//
//     components: {
//         Carousel,
//         Slide
//     },
//
//     data() {
//         return {
//             pictures: [
//                 'solution1.jpg',
//                 'solution1.jpg',
//                 'solution1.jpg',
//             ],
//         }
//     },
//
//     mounted() {
//         axios.get('http://192.168.40.131:3000/solutions', {'Authorization': `Bearer ${this.token}`})
//             .then(response => {
//                 this.pictures = response.pictures;
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     },
}
</script>

<style scoped>
.slider {
    position: relative;
    overflow: hidden;
}
.slider-content {
    display: flex;
    transition: transform 0.5s ease-in-out;
}
.slider-nav {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
.slider-nav button {
    margin: 0 10px;
}
</style>