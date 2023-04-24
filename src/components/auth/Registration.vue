<template>
    <section>
        <div class="container-fluid col-lg-7">
            <div class="d-flex">
                <div class="col-lg-12 d-flex">
                    <div class="form-group d-flex align-items-center justify-content-center h-custom-2 col-lg-6 px-5 ms-xl-4 pt-xl-0 mt-xl-n5">
                        <form action="http://192.168.40.131:3000/auth/login" type="POST">

                            <h3 class="fw-normal mb-3 pb-3 text-light">Sign Up</h3>

                            <div class="form-outline mb-4">
                                <input type="email" name="email" id="form2Example18" class="form-control form-control-lg" />
                                <label class="form-label text-light" for="form2Example18">Email address</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="text" name="full_name" id="form2Example28" class="form-control form-control-lg" />
                                <label class="form-label text-light" for="form2Example28">Full Name</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="text" name="username" id="form2Example28" class="form-control form-control-lg" />
                                <label class="form-label text-light" for="form2Example28">Username</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" name="password" id="form2Example28" class="form-control form-control-lg" />
                                <label class="form-label text-light" for="form2Example28">Password</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" name="password_confirmation" id="form2Example28" class="form-control form-control-lg" />
                                <label class="form-label text-light" for="form2Example28">Confirm password</label>
                            </div>

                            <div class="pt-1 mb-4 d-flex justify-content-between">
                                <button class="text-light btn btn-info btn-lg btn-block" type="button">Sign Up</button>
                            </div>
                        </form>
                    </div>

                    <div class="col-lg-6 px-0 d-none d-sm-block">
                        <img src="../../assets/pictures/math_background.jpg"
                             alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Registration"
}
</script>

<style scoped>
    @import "../../assets/style/auth.css";
</style>