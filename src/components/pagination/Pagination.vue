<template>
    <nav v-if="propCount > 0" aria-label="Page navigation example" class="d-flex justify-content-center">
        <ul class="pagination" ref="pages">
            <li class="page-item" @click="previous"><span class="page-link" href="#" aria-label="Previous">&laquo;</span></li>
            <li v-for="page in propCount" class="page-item" @click="pageItem">
                <span :class="{'current-page': currentPage === page}" class="page-link pages" :ref="page" v-if="page > this.pivot - 2 && page < this.pivot + 2" >{{ page }}</span>
            </li>
            <li class="page-item" @click="next"><span class="page-link" href="#" aria-label="Next">&raquo;</span></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",

    props: {
        propCount: Number,
    },

    methods: {
        next: function () {
            alert(this.propCount)
            for (const page of this.pages) {
                page.style.backgroundColor = null;
                page.style.color = null;
            }

            if (this.currentPage >= 2 && this.pivot < this.propCount - 1) {
                this.pivot += 1;
            }

            if (this.currentPage < this.propCount) {
                this.currentPage++;

                this.emitCurrentPage(this.currentPage);
            }
        },

        previous: function () {
            for (const page of this.pages) {
                page.style.backgroundColor = null;
                page.style.color = null;
            }

            if (this.currentPage < this.propCount && this.pivot > 2) {
                this.pivot -= 1;
            }

            if (this.currentPage > 1) {
                this.currentPage--;

                this.emitCurrentPage(this.currentPage);
            }
        },

        pageItem: function (event) {
            for (const page of this.pages) {
                page.style.backgroundColor = null;
                page.style.color = null;
            }

            this.pivot = +event.target.innerText;
            this.currentPage = +event.target.innerText;

            this.emitCurrentPage(this.currentPage);
        },

        emitCurrentPage: function (currentPage) {
            this.$emit('currentPage', currentPage)
        }
    },

    data() {
        return {
            pivot: 2,
            currentPage: 1,
            pages: null,
        }
    },

    mounted() {
        console.log(this.propCount)
        console.log(this.$refs)
        // this.pages = this.$refs.pages.querySelectorAll('li span');
    }
}
</script>

<style scoped>
    ul li{
        padding: 0;
        margin: 0;
    }

    ul li span{
        color: #2c4d50;
    }

    ul li span:hover {
        background-color: rgb(44, 62, 80, .5);
        color: #f2f2f2;
        cursor: pointer;
    }

    .current-page {
        background-color: #2c4d50;
        color: #f2f2f2;
    }
    nav {
        position: relative;
        width: 100%;
        height: 10%;
        display: flex;
        align-items: end;
        justify-content: end;
    }

    ul {
        position: absolute;

        background-color: #f1f1f1;
    }
</style>