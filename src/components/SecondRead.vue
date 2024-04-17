<template>
    <div>
      <!-- Navbar -->
      <nav class="navbar">
          <h3>Second Reading</h3>
        <div class="buttons">
          <button @click="goToSupervisorHome">Home</button>
          <button  @click="logout">Logout</button>
        </div>
      </nav>
  
      <!-- List -->
      <div class="list">
        <div v-for="(item, index) in items" :key="index" class="list-item">
          <div class="item-name">{{ item.name }} </div>
          <button class="item-button" @click="showOverlay(item)">View</button>
        </div>
      </div>
  
      <!-- Overlay -->
      <div class="overlay" v-if="showOverlayFlag">
        <div class="overlay-content">
          <h2>Project Details</h2>
          <p>Project Name: {{ selectedProject.name}}</p>
          <p>Student Name: {{ selectedProject.student }}</p>
          <p>Project Description: <br>{{ selectedProject.description }}</p> 
          <div class="overlay-buttons">
            <button class="accept-button" @click="acceptProject">Become a second reader</button>
            <button class="cancel-button" @click="closeOverlay">Cancel</button>
          </div>
        </div>
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
        showOverlayFlag: false,
        selectedProject: null
      };
    },
    mounted() {
      this.fetchItems();
    },
    methods: {
      async fetchItems() {
        const config = useConfigStore();
        console.log("fetch items called")
        try {
          const url = `${config.config.backend_url}/GetAllAcceptedRequests`;
          const response = await axios.get(url, {
            headers: {
              authorization: `Bearer ${config.accessToken}`,
            },
          });
          console.log("Response data fetched successfully");
          this.items = await Promise.all(response.data.map(async item => {
            return {
              id: item.id,
              name: item.heading,
              student: item.student_name, 
              description: item.description,
              student_id: item.student_id
            };
          }));
  
          console.log("Processed items:", this.items);
  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    },
  
    
  
      goToSupervisorHome() {
        this.$router.push('/supervisorHome');
      },
      logout() {
        this.$router.push('/logout');
      },
      
      acceptProject() {
        this.acceptProjectApplication() 
        this.showOverlayFlag = false;
      },
      denyProject() {
        this.declineProjectApplication()
        this.showOverlayFlag = false;
      },
  
      showOverlay(item) {
        this.selectedProject = item;
        this.showOverlayFlag = true;
      },
  
      closeOverlay() {
        this.showOverlayFlag = false;
      },
      
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
    border-radius: 5px;
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
  
  .accept-button {
    background-color: #228049; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .deny-button {
    background-color: #d32f2f; /* Red */
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .cancel-button {
    background-color: #414141; /* Red */
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .accept-button:hover, .deny-button:hover, .cancel-button:hover {
    opacity: 0.8;
  }
  </style>
  