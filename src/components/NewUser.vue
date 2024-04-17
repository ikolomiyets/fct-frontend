<template>
    <div class="container">
      <h1 class="title">Finish Registering New Account</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <input class="inputbox" type="text" v-model="firstName" placeholder="First Name" required>
        </div>
        <div class="input-group">
          <input class="inputbox" type="text" v-model="lastName" placeholder="Last Name" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useConfigStore } from "../store/config";
  import axios from "axios";

  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        newUser: {
            name: ''
        }
      }
    },
    methods: {
      async submitForm() {
        this.newUser.name = this.firstName + " " + this.lastName;
        const config = useConfigStore();
        try {
            const response = await axios.post(`${config.config.backend_url}/createStudentUser`, this.newUser, { 
                headers: {
                authorization: `Bearer ${config.accessToken}`,
                }
            });
            if (response.status === 204) {
                console.log("submission successful");
                this.$router.push('/application');
            } else {
                console.log('Unexpected status code: ' + response.status);
            }
        } catch (error) {
            console.error(error);
        }
      }
    }
  }
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .input-group {
    margin: 10px;
  }
  
  .inputbox {
    padding: 10px;
    margin: 5px;
    width: 300px; 
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  