<template>
    <div class="login">
        <div class="container" style="margin-top:100px">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div v-if="loginFailed" class="alert alert-danger">
                        Email atau Password salah
                    </div>
                    <div class="card">
                        <div class="card-body">
                            Login
                            <hr>
                            <form @submit.prevent="login">

                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control"
                                    v-model="user.email" placeholder="Masukkan Email">
                                    
                                    <div class="mt-2 alert alert-danger" v-if="validation.email">
                                        Masukkan Email                                    
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" v-model="user.password"
                                    placeholder="Masukkan Password">
                                    
                                    <div class="mt-2 alert alert-danger" v-if="validation.password">
                                        Masukkan Password
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',

    data(){
        return {
            //state loggedIn
            loggedIn: localStorage.getItem('loggedIn'),
            //state token
            token: localStorage.getItem('token'),
            //state user
            user: [],
            //state validation
            validation: [],
            //state login failed
            loginFailed: null
        }
    },

    methods: {
        login(){
            if (this.user.email && this.user.password){
                axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(response => {
                    //debug cookie
                    console.log(response)

                    axios.post('http://localhost:8000/api/login', {
                        email: this.user.email,
                        password: this.user.password
                    })
                    .then(res => {
                        //debug user login
                        console.log(res)
                        //jika sukses login
                        if (res.data.success){
                            //ubah nilai loggedIn
                            localStorage.setItem("loggedIn", "true");

                            //ambil token
                            localStorage.setItem("token", res.data.token)

                            //ubah state loggedIn
                            this.loggedIn = true

                            //redirect ke dashboard
                            return this.$router.push({
                                name: 'dashboard'
                            })
                        }
                        else{
                            //ketika login failed
                            this.loginFailed = true
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
            }
            this.validation = []

            if(!this.user.email){
                this.validation.email = true
            }

            if(!this.user.password){
                this.validation.password = true
            }
        }
    },

    //periksa apakah user sudah login
    mounted(){
        //kalau loggedIn bernilai true, tampilkan halaman dashboard
        if(this.loggedIn){
            return this.$router.push({
                name: 'dashboard'
            })
        }
    }
}
</script>