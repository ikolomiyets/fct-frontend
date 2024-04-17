<template>
  <div v-if="error">
    <h1>{{ error }}</h1>
  </div>
  <div v-else>
    <h2></h2>
    <div v-for="q in questions" key="q.id">
        <div>{{ q.id }}</div>
        <div>{{ q.question }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useConfigStore } from '../store/config';

export default {
  data() {
    return {
      questions: [],
      error: null,
    };
  },
  async created() {
    try {
      const config = useConfigStore();
      console.log(config);
      //const response = await axios.get('http://localhost:3000/questions', {
      //  headers: {
      //    'Accept': 'application/json',
      //    'Authorization': `Bearer ${config.accessToken}`                      }
      //});
      //this.error = null;
      //this.questions = response.data.questions;
    } catch(e) {
      console.log(e);
      this.error = e.message;
    }
  },
  methods: {
    login() {
      // Simulate a login process (replace with my authentication logic)
      if (this.username === 'user' && this.password === 'password') {
        alert('Login successful!');
      } else {
        alert('Invalid username or password.');
      }
    }
  }
};
</script>

<style scoped>
  h2 {
    color: #42b983;
  }

  form {
    max-width: 300px;
    margin: auto;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  button {
    background-color: #42b983;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
</style>