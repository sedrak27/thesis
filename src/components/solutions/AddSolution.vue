<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <img :src="userData.avatar" class="card-img-top" alt="Profile Picture">
                    <div class="card-body">
                        <h5 class="card-title">{{ userData.full_name }}</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis diam ex. Integer
                            id quam id elit consectetur fermentum at ac tortor. Ut eu mauris lobortis, mollis massa et, finibus
                            tellus.</p>
                        <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Personal Information</h5>
                        <hr>
                        <form @submit.prevent="changeProfileData" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="full_name" class="form-label">Full name</label>
                                        <input type="text" class="form-control" id="full_name" v-model="userData.full_name" :readonly="isReadonly">

                                        <label for="email" class="form-label mt-3">E-mail</label>
                                        <input type="email" class="form-control" id="email" v-model="userData.email" :readonly="isReadonly">
                                    </div>

                                    <div class="mb-3">
                                        <label for="username" class="form-label">Username</label>
                                        <input type="text" class="form-control" id="username" v-model="userData.username" :readonly="isReadonly">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="address" class="form-label">Address</label>
                                        <textarea class="form-control" id="address" rows="3"  v-model="userData.address" :readonly="isReadonly"></textarea>
                                    </div>

                                    <div v-if="!isReadonly" class="mb-3">
                                        <label for="avatar" class="form-label">Avatar</label>
                                        <input type="file" class="form-control" id="avatar" :readonly="isReadonly">
                                    </div>

                                    <div class="col-lg-12 d-flex justify-content-end">
                                        <button v-if="!isReadonly" class="btn btn-primary" type="submit">Save</button>
                                    </div>
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
export default {
    name: "AddSolution"
}
</script>

<style scoped>

</style>