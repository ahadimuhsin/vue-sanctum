<template>
    <div class="dashboard" style="margin-top: 80px">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            Main Menu
                            <hr>
                            <ul class="list-group">
                                <router-link 
                                :to="{name: 'dashboard'}" class="list-group-item text-dark text-decoration-none">
                                Dashboard
                                </router-link>
                                <li @click="logout" class="list-group-item tex-dark text-decoration-none"
                                style="cursor:pointer">Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            Dashboard
                            <hr>
                            Selamat datang <strong>{{user.name}}</strong>
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
    name: 'Dashboard',

    data() {
        return {
            //state loggedIn
            loggedIn: localStorage.getItem("loggedIn"),
            //state token
            token: localStorage.getItem('token'),
            //state user logged In
            user: []
        }
    },

    created(){
        axios.get('http://localhost:8000/api/user', {
            headers: {'Authorization': 'Bearer '+this.token}
        })
        .then(response => {
            console.log(response)
            this.user = response.data //simpan response ke state user
        })
    },

    methods: {
        logout(){
            axios.get('http://localhost:8000/api/logout')
            .then(()=> {
                //hapus localstorage loggedIn
                localStorage.removeItem("loggedIn")

                // redirect ke halaman login
                return this.$router.push(
                    {name: 'login'
                })
            })
        }
    },

    //cek apakah user login atau tidak
    mounted(){
        if(!this.loggedIn){
            return this.$router.push({name: 'login'})
        }
    }
}
</script>