<template>
  <div class="entry-page">
    <div class="background" :style="{ background: backgroundStyle }"></div>
    <button class="enter-button" @mouseenter="hoverEnter" @mouseleave="hoverLeave" @click="redirectToWebsite">Enter Website</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    backgroundStyle() {
      return this.isHovered ? 'linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(your-image.jpg)' : 'url(your-image.jpg)';
    }
  },
  methods: {
    hoverEnter() {
      this.isHovered = true;
    },
    hoverLeave() {
      this.isHovered = false;
    },
    redirectToWebsite() {
      window.location.href = 'application';
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  transition: background 0.5s ease;
}

.enter-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 30px;
  font-size: 18px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.5s ease;
}

.enter-button:hover {
  background-color: #555; 
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
