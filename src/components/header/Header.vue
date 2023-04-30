<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="col-lg-12">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
                    <li class="nav-item">
                        <router-link to="/" class="navbar-brand logo" href="#">
                            <img src="../../assets/pictures/logo.png" alt="logo" width="75" height="50">
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="!isAuthorized">
                        <router-link class="nav-link text-light" to="/login">Sign In</router-link>
                    </li>

                    <li class="nav-item" v-if="!isAuthorized">
                        <router-link class="nav-link text-light" to="/registration">Sign Up</router-link>
                    </li>

                    <li class="nav-item" v-if="isAuthorized">
                        <router-link class="nav-link text-light" to="/solution/add">Ավելացնել փոստ</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-primary" type="submit">Search</button>


                    <router-link class="btn btn-primary" to="/registration">Logout</router-link>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",

    data() {
        return {
            isAuthorized: false,
        }
    },

    mounted() {
        if (localStorage.getItem('jwtToken')) {
            this.isAuthorized = true;
        }
    }
}
</script>

<style scoped>
    .logo{
        max-width: 20px;
        max-height: 20px;
    }

    nav {
        background-color: #2c4d50;
    }
</style>