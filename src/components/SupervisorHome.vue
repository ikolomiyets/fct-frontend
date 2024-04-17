<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <h3>Supervisor Home</h3>
      <div class="buttons">
        <button  @click="goToRequests">Proposals</button>
        <button @click="goToSecondRead">Second Reading</button>
        <button  @click="logout">Logout</button>
      </div>
    </nav>
    <h3 class="subheading">Your supervised Projects</h3>
    <!-- List -->
    <div class="list">
      <div v-for="(item, index) in items" :key="index" class="list-item">
        <div class="item-name">{{ item.name }}</div>
        <button class="item-button" @click="goToCollab(item)">View</button>
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
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      const config = useConfigStore();
      try {
        const url = `${config.config.backend_url}/getProjects`;
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${config.accessToken}`,
          },
        });
        console.log("Response data:", response.data); 
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    goToRequests() {
      this.$router.push('/requests');
    },
    logout() {
      this.$router.push('/logout');
    },
    goToCollab(item) {
      this.$router.push(`/collab/${item.id}`);
    },
    goToSecondRead() {
      this.$router.push('/secondRead');
    }
  },
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
  cursor: pointer;
}

.item-button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
}
</style>
