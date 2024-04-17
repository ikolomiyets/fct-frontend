<template>
    <div>
      <!-- Navbar -->
      <nav class="navbar">
        <div class="logo">
          <!-- Logo goes here -->
          <!-- <img src="logo.png" alt="Logo" /> --> 
          <h3>Answer Page</h3>
        </div>
        <div class="buttons">
          <!-- Navbar buttons go here -->
          <button  @click="goToSupervisorHome">Home</button>
        </div>
      </nav>
  
      <!-- List -->
      <div class="list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="list-item"
        >
          <div class="item-name">{{ item.name }}</div>
          <button class="item-button">View</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [], // Data fetched from the database
      };
    },
    mounted() {
      // Fetch data from the database and assign it to 'items'
      // For demonstration purpose, let's assume 'items' is an array of objects
      this.items = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
      ];
    },
    methods: {
        goToSupervisorHome() {
          window.location.href = 'supervisorHome'; //set to go to answers when that is made
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
  }
  </style>