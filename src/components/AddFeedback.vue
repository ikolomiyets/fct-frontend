<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <!-- Logo goes here -->
        <!-- <img src="logo.png" alt="Logo" /> -->
      </div>
      <h3>Feedback</h3>
      <div class="buttons">
        <!-- Navbar buttons go here -->
        
        <button  @click="goBack()">Back</button>
      </div>
      

    </nav>

    <div>
        <textarea class="text-area" v-model="text" rows="" cols="10"></textarea>
    </div>
    <div  class="buttons">
      <button @click="updateFeedback">Save</button>
    </div>
    </div>

</template>

<script>
import { useConfigStore } from "../store/config";
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      text: ''
    };
  },
  
  methods: {

    

    // async fetchItems() {
    //   const config = useConfigStore();
    //   try {
    //     const url = `${config.config.backend_url}/getProjects`;
    //     const response = await axios.get(url, {
    //       headers: {
    //         authorization: `Bearer ${config.accessToken}`,
    //       },
    //     });
    //     console.log("Response data:", response.data); 
    //     this.items = response.data;
    //     console.log(this.items);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
      goBack() {
        this.$router.push(`/collab/${this.$route.params.id}`);
       console.log(item.id);
      },
   

    async fetchFeedback() {
      const config = useConfigStore();
      const url = `${config.config.backend_url}/getFeedback/${this.$route.params.feedbackId}`;
      try{
        
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${config.accessToken}`
          }
        })
        
        this.text = response.data;
        console.log(this.text);
      } catch (error) {
        console.error("error getting feedback");
        console.log(error);
      
      }
    },

    async updateFeedback() {
      const config = useConfigStore();
      console.log(this.text);
      const url = `${config.config.backend_url}/updateFeedback/${this.$route.params.feedbackId}/${this.text}`;
      try{
        
        await axios.patch(url, {
          headers: {
            authorization: `Bearer ${config.accessToken}`
          }
        })
          console.log("feedback updated successfully");
          this.goBack();
      } catch (error) {
        console.error("error getting feedback");
        console.log(error);
      
      }
      
    }

  },

  mounted() {
    this.fetchFeedback(); 
  }
};
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
}

.logo img {
  max-height: 40px;
}

.buttons button {
  margin-left: 10px;
  background-color: #228049; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
}

.text-area-container {
 
  width: 100%
}

.text-area {
  margin-top: 30px;
  margin-left: 2%;
  margin-right: 2%;
  width: 96%;
  height: 500px; /* You can adjust the height as needed */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none; /* Disable textarea resizing */
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transition for border and box-shadow */
}

.text-area:focus {
  outline: none;
  border-color: #007bff; /* Change border color on focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}
.item-button {
  background-color: #228049; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}


.item-button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
}

.list {
  margin-top: 20px;
}

.list-item {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 0 20px;
}

.item-name {
  flex: 1;
  font-family: Arial, Helvetica, sans-serif;
}

.item-button {
  margin-left: 10px;
  background-color: #228049; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.item-button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.overlay-buttons {
  margin-top: 20px;
}
</style>
;