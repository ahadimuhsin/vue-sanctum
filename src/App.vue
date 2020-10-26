<template>
  <div id="app">
    <!-- Buat Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" v-if="this.$route.path !== '/login'">
      <router-link :to="{name: 'home'}" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault" aria-expanded="false"
      aria-label="Toggle naviagtion">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navabrsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'dashboard'}" class="nav-link">Dashboard </router-link>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <router-link :to="{name: 'login'}" v-if="!loggedIn"
          class="btn btn-primary my-2 my-sm-0">Login</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data(){
    return {
      //set data awal = null
      //digunakan untuk menghilangkan tombol login
      //apabila user sudah login
      loggedIn: null
    }
  },

  methods: {
    //properti loggedIn di atas akan diassign sebuah nilai
    //yang didapatkan dari localStorage dengan key loggedIn
    //localStorage berubah menjadi true saat melakukan
    //authentication
    getLoggedIn(){
      this.loggedIn = localStorage.getItem("loggedIn")
    }
  },

  //properti wath untuk mendapatkan nilai terbaru saat
  //ada perubahan secara reactive saat properti
  //loggedIn berubah nilainya
  watch: {
    $route: {
      immediate: true,
      handler(){
        this.getLoggedIn()
      }
    }
  },
}
</script>