<template>
    <!-- Navbar -->
    <nav class="navbar">
          <h3>Administrator dashboard</h3>
        <div class="buttons">
          <button  @click="logout()">Logout</button>
        </div>
    </nav>

    <div>
    <h2>Submission Form for new Supervisor account </h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">First Name:</label>
        <input type="text" id="name" v-model="formData.firstName" required>
      </div>
      <div>
        <label for="name">Last Name:</label>
        <input type="text" id="name" v-model="formData.LastName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required>
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
            formData: {
                email: '',
                password: '',
                firstName: '',
                LastName: ''
            }
        };
    },

     methods: {
         logout() {
          this.$router.push('/logout');
         },

        async handleSubmit() {
            const config = useConfigStore();
            await axios.post(`${config.config.backend_url}/createSupervisorUser`, this.formData, { 
                headers: {
                authorization: `Bearer ${config.accessToken}`,
                }
            })
                .then(response => {
                    this.formData.email = '',
                    this.formData.password = '',
                    this.formData.firstName = '',
                    this.formData.LastName = ''
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
  padding: 10px;
  background-color: #333;
  color: white;
}

.buttons button {
  margin-left: 10px;
  background-color: #228049; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: rgba(0, 255, 0, 0.651); 
}

</style>