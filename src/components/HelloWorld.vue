<template>
  <div class="entry-page">
    <div class="background" >
      
    </div>

    <button class="enter-button" @mouseenter="hoverEnter" @mouseleave="hoverLeave" @click="redirectToWebsite">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
    };
  },
  
  
  methods: {
    hoverEnter() {
      this.isHovered = true;
    },
    hoverLeave() {
      this.isHovered = false;
    },
    redirectToWebsite() {
      //this.$router.push("/login");
      window.location.href = 'login';
    }
  }
};
</script>

<style scoped>
.entry-page {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background {
  background-image: url("../assets/carousel1.jpg");
  background-size: cover;                       /* Scale the background image to cover the entire container */
  background-position: center;                 /* Center the background image */
  background-repeat: no-repeat;                /* Do not repeat the image */
  height: 100vh;                               /* Make sure the body covers the whole viewport */
  margin: 0;    
}

.enter-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 30px;
  font-size: 18px;
  background-color: #003f03;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.5s ease;
}

.enter-button:hover {
  background-color: #00914d; 
}
</style>

<!-- <script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <button @click="goToAbout">Go to </button>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style> -->
